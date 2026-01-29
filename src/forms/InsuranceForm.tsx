"use client";

import React, { useMemo, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    AlertCircle,
    CheckCircle2,
    Loader,
    PlusCircle,
    Trash2,
    Upload,
    UserRound,
} from "lucide-react";
import useUserPrefill from "@/hooks/useUserPrefill";

type BaseFields = {
    name: string;
    email: string;
    phone: string;
};

type PaxInsurance = {
    id: string;
    insuranceType: "Travel Insurance" | "Student Insurance" | "";
    travelDate: string;
    returnDate: string;
    tripDuration: string;
    destination: string;
    specialRequirements: string;
    passportFile: File | null;
};

type UploadedDoc = {
    url: string;
    originalName: string;
    mimeType: string;
    size: number;
};

const INSURANCE_TYPES: Array<PaxInsurance["insuranceType"]> = [
    "Travel Insurance",
    "Student Insurance",
];

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_PASSPORT_TYPES = "application/pdf,image/jpeg,image/png,image/jpg,image/*";

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function InsuranceForm() {
    const { user } = useUserPrefill();

    useEffect(() => {
        if (!user) return;
        setBase((prev) => ({
            ...prev,
            name: prev.name || user.name || "",
            email: prev.email || user.email || "",
            phone: prev.phone || user.phone || "",
        }));
    }, [user]);
    const [base, setBase] = useState<BaseFields>({
        name: "",
        email: "",
        phone: "",
    });

    const [paxes, setPaxes] = useState<PaxInsurance[]>([
        {
            id: uid(),
            insuranceType: "",
            travelDate: "",
            returnDate: "",
            tripDuration: "",
            destination: "",
            specialRequirements: "",
            passportFile: null,
        },
    ]);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // KEEP SAME API
    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

    const getToken = () =>
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const validateFileSize = (file: File, label: string) => {
        if (file.size > MAX_FILE_BYTES) {
            const mb = (file.size / (1024 * 1024)).toFixed(2);
            throw new Error(`${label} is ${mb} MB. Max allowed is 5 MB.`);
        }
    };

    const uploadToCloudinary = async (file: File): Promise<UploadedDoc> => {
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            throw new Error("Cloudinary not configured");
        }

        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
            { method: "POST", body: fd }
        );

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error?.message || "Upload failed");

        return {
            url: String(data?.secure_url || data?.url || ""),
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
        };
    };

    /** -------- Base fields (ONE TIME) -------- */
    const handleBaseChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError(null);
        setSuccess(null);
        setBase((prev) => ({ ...prev, [name]: value }));
    };

    /** -------- Pax handlers -------- */
    const handlePaxChange = (
        paxId: string,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setError(null);
        setSuccess(null);

        setPaxes((prev) =>
            prev.map((p) => (p.id === paxId ? { ...p, [name]: value } : p))
        );
    };

    const handlePassportChange = (paxId: string, file: File | null) => {
        setError(null);
        setSuccess(null);

        setPaxes((prev) =>
            prev.map((p) => {
                if (p.id !== paxId) return p;
                if (!file) return { ...p, passportFile: null };

                try {
                    validateFileSize(file, "Passport file");
                } catch (e: any) {
                    setError(e?.message || "File too large. Max 5 MB.");
                    return { ...p, passportFile: null };
                }

                return { ...p, passportFile: file };
            })
        );
    };

    const addPax = () => {
        setError(null);
        setSuccess(null);
        setPaxes((prev) => [
            ...prev,
            {
                id: uid(),
                insuranceType: "",
                travelDate: "",
                returnDate: "",
                tripDuration: "",
                destination: "",
                specialRequirements: "",
                passportFile: null,
            },
        ]);
    };

    const removePax = (paxId: string) => {
        setError(null);
        setSuccess(null);
        setPaxes((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== paxId)));
    };

    const isValid = useMemo(() => {
        if (!base.email.trim()) return false;
        if (!base.phone.trim()) return false;

        for (const p of paxes) {
            if (!p.insuranceType) return false;
            if (!p.travelDate) return false;
            if (!p.passportFile) return false; // required
            // returnDate/tripDuration/destination/specialRequirements are optional
        }
        return true;
    }, [base, paxes]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const token = getToken();
        if (!token) {
            setError("Please login to submit this form");
            return;
        }

        if (!isValid) {
            setError("Please fill all required fields and upload passport.");
            return;
        }

        setSubmitting(true);
        try {
            const paxPayload = [];

            for (let i = 0; i < paxes.length; i++) {
                const p = paxes[i];

                if (!p.passportFile) throw new Error(`Passport is required for pax ${i + 1}`);
                validateFileSize(p.passportFile, `Pax ${i + 1} passport`);

                const passport = await uploadToCloudinary(p.passportFile);

                paxPayload.push({
                    paxNo: i + 1,
                    insuranceType: p.insuranceType,
                    travelDate: p.travelDate,
                    returnDate: p.returnDate || "",
                    tripDuration: p.tripDuration || "",
                    destination: p.destination || "",
                    specialRequirements: p.specialRequirements || "",
                    passport,
                });
            }

            // KEEP SAME API ROUTE
            // (payload includes paxes; base info once)
            const payload = {
                name: base.name || "",
                email: base.email,
                phone: base.phone,

                paxes: paxPayload,

                submittedAt: new Date().toISOString(),
                tracking: {
                    pageUrl: typeof window !== "undefined" ? window.location.href : "",
                    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                },
            };

            const res = await fetch(`${API_BASE}/insurance/enquiry`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "Submission failed");

            setSuccess(
                "Your insurance enquiry has been submitted successfully. Our team will contact you shortly with suitable options."
            );

            setBase({ name: "", email: "", phone: "" });
            setPaxes([
                {
                    id: uid(),
                    insuranceType: "",
                    travelDate: "",
                    returnDate: "",
                    tripDuration: "",
                    destination: "",
                    specialRequirements: "",
                    passportFile: null,
                },
            ]);
        } catch (err: any) {
            setError(err?.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <div className="w-full rounded-2xl border border-emerald-900/10 bg-gradient-to-b from-white to-emerald-50/40 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-emerald-900/10 bg-white/70 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-900/10 flex items-center justify-center">
                            <UserRound className="h-5 w-5 text-emerald-900" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Insurance Enquiry</h2>
                            <p className="text-sm text-slate-600">
                                Add pax details and upload passport to get suitable insurance options.
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={addPax}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl"
                    >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add More Pax
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">{success}</p>
                        </div>
                    )}

                    {/* Base details (ONE TIME) */}
                    <div className="rounded-2xl border border-emerald-900/10 bg-white p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Name (Optional)
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={base.name}
                                    onChange={handleBaseChange}
                                    placeholder="Your name"
                                    className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={base.email}
                                    onChange={handleBaseChange}
                                    placeholder="your@email.com"
                                    className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mobile *</label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={base.phone}
                                    onChange={handleBaseChange}
                                    placeholder="+91 9876543210"
                                    className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pax blocks */}
                    <div className="space-y-5">
                        {paxes.map((p, idx) => (
                            <div key={p.id} className="rounded-2xl border border-emerald-900/10 bg-white p-5">
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-emerald-900/10 flex items-center justify-center">
                                            <span className="text-sm font-semibold text-emerald-900">{idx + 1}</span>
                                        </div>
                                        <h3 className="text-base font-semibold text-slate-900">Pax Details</h3>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={() => removePax(p.id)}
                                        disabled={paxes.length <= 1}
                                        variant="ghost"
                                        className="rounded-xl text-slate-700 hover:text-red-600 hover:bg-red-50 disabled:opacity-40"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Insurance Type *
                                        </label>
                                        <select
                                            name="insuranceType"
                                            value={p.insuranceType}
                                            onChange={(e) => handlePaxChange(p.id, e)}
                                            className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                            required
                                        >
                                            <option value="">Select Insurance Type</option>
                                            {INSURANCE_TYPES.map((t) => (
                                                <option key={t} value={t} className="bg-white">
                                                    {t}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Travel Start Date *
                                        </label>
                                        <Input
                                            type="date"
                                            name="travelDate"
                                            value={p.travelDate}
                                            onChange={(e) => handlePaxChange(p.id, e)}
                                            className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Return Date
                                        </label>
                                        <Input
                                            type="date"
                                            name="returnDate"
                                            value={p.returnDate}
                                            onChange={(e) => handlePaxChange(p.id, e)}
                                            className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Trip Duration (Days)
                                        </label>
                                        <Input
                                            type="number"
                                            name="tripDuration"
                                            value={p.tripDuration}
                                            onChange={(e) => handlePaxChange(p.id, e)}
                                            placeholder="Number of days"
                                            min="1"
                                            className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                                        />
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Destination Country *
                                        </label>
                                        <select
                                            name="destination"
                                            value={p.destination}
                                            onChange={(e) => handlePaxChange(p.id, e)}
                                            className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                            required
                                        >
                                            <option value="">Select Destination Country</option>
                                            {[
                                                "Bulgaria",
                                                "North Macedonia",
                                                "Croatia",
                                                "Serbia",
                                                "Russia",
                                                "Montenegro",
                                                "Belarus",
                                            ].map((t) => (
                                                <option key={t} value={t} className="bg-white">
                                                    {t}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Passport upload */}
                                <div className="mt-5">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Upload Passport (Required)
                                    </label>

                                    <div className="relative rounded-xl border border-dashed border-emerald-900/20 bg-emerald-50/40 hover:bg-emerald-50/70 transition">
                                        <label className="flex items-center gap-2 cursor-pointer px-4 py-4">
                                            <div className="h-9 w-9 rounded-lg bg-white border border-emerald-900/10 flex items-center justify-center">
                                                <Upload className="w-4 h-4 text-emerald-900" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {p.passportFile ? p.passportFile.name : "Upload passport file"}
                                                </p>
                                                <p className="text-xs text-slate-500">PDF, JPG, PNG (max 5MB)</p>
                                            </div>

                                            <input
                                                type="file"
                                                accept={ACCEPTED_PASSPORT_TYPES}
                                                onChange={(e) => handlePassportChange(p.id, e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                        </label>

                                        {p.passportFile && (
                                            <button
                                                type="button"
                                                onClick={() => handlePassportChange(p.id, null)}
                                                className="absolute right-3 top-3 text-slate-500 hover:text-red-600"
                                                aria-label="Remove passport"
                                                title="Remove"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Special requirements */}
                               
                            </div>
                        ))}
                    </div>

                    <Button
                        type="submit"
                        disabled={!isValid || submitting}
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 disabled:opacity-50"
                    >
                        {submitting ? (
                            <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Enquiry"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
