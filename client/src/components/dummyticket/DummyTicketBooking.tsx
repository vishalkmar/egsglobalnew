"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";

type ActiveTab = "dummyTicket" | "insurance";
type TripType = "oneWay" | "roundTrip";

const DummyTicketBooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dummyTicket");
  const [tripType, setTripType] = useState<TripType>("oneWay");

  const [flightForm, setFlightForm] = useState({
    name: "",
    email: "",
    startLocation: "",
  
    departureDate: "",
    returnDate: "",
  });

  const [insuranceForm, setInsuranceForm] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: "",
    travelDate: "",
    dob: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Dummy ticket form change
  const handleFlightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightForm((prev) => ({ ...prev, [name]: value }));
  };

  // Insurance form change
  const handleInsuranceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInsuranceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    let payload: any = { tab: activeTab };

    if (activeTab === "dummyTicket") {
      const {
        name,
        email,
        startLocation,
        
        departureDate,
        returnDate,
      } = flightForm;

      // basic validation
      if (!name || !email || !startLocation || !endLocation || !departureDate) {
        setError("Please fill all required fields in the dummy ticket form.");
        return;
      }
      if (tripType === "roundTrip" && !returnDate) {
        setError("Please select a return date for round trip.");
        return;
      }

      payload = {
        ...payload,
        tripType,
        ...flightForm,
        amount: 1000,
      };
    } else if (activeTab === "insurance") {
      const { name, email, mobile, destination, travelDate, dob } =
        insuranceForm;

      // light validation for insurance as well
      if (!name || !email || !mobile || !destination || !travelDate || !dob) {
        setError("Please fill all required fields in the insurance form.");
        return;
      }

      payload = {
        ...payload,
        ...insuranceForm,
      };
    }

    console.log("Dummy ticket / Insurance form submit payload:", payload);

    alert("Your request has been submitted successfully. Our team will coordinate with you shortly.");
  };

  return (
    <section className="bg-white py-12 mt-[50px] sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT SIDE: info + image */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                Book Your Dummy Ticket in Minutes
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-md">
                Choose your option, share basic details and submit your request.
                Our team will process your dummy ticket or travel insurance and
                share the confirmation with you shortly.
              </p>
            </div>

            <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
              <img
                src="/dummyticketimage.webp"
                alt="Dummy ticket booking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <ul className="space-y-2 text-sm text-white">
                  <li>• 100% visa-friendly documentation</li>
                  <li>• Instant request submission, processed by our team</li>
                  <li>• Support for dummy ticket and travel insurance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: form */}
          <div className="w-full">
            <div className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden bg-white">
              {/* Tabs */}
              <div className="flex bg-slate-100">
                {[
                  { id: "dummyTicket" as ActiveTab, label: "Dummy Ticket" },
                  { id: "insurance" as ActiveTab, label: "Insurance" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setError(null);
                    }}
                    className={`flex-1 py-2.5 text-sm sm:text-base font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "bg-sky-600 text-white border-sky-700"
                        : "bg-transparent text-slate-700 border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 space-y-4 sm:space-y-5"
              >
                {/* Error message */}
                {error && (
                  <div className="rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-xs sm:text-sm text-rose-700">
                    {error}
                  </div>
                )}

                {/* Dummy Ticket tab */}
                {activeTab === "dummyTicket" && (
                  <>
                    {/* Trip type toggle */}
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-4 rounded-full bg-slate-100 px-5 py-2">
                        <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="tripType"
                            value="oneWay"
                            checked={tripType === "oneWay"}
                            onChange={() => setTripType("oneWay")}
                            className="accent-sky-600"
                          />
                          <span>One Way</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="tripType"
                            value="roundTrip"
                            checked={tripType === "roundTrip"}
                            onChange={() => setTripType("roundTrip")}
                            className="accent-sky-600"
                          />
                          <span>Round Trip</span>
                        </label>
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                          NAME
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={flightForm.name}
                          onChange={handleFlightChange}
                          className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                          EMAIL
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={flightForm.email}
                          onChange={handleFlightChange}
                          className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>

                      <input
                        type="text"
                        name="startLocation"
                        placeholder=" DESTINATION"
                        value={flightForm.startLocation}
                        onChange={handleFlightChange}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                     

                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                          DEPARTURE DATE
                        </label>
                        <input
                          type="date"
                          name="departureDate"
                          value={flightForm.departureDate}
                          onChange={handleFlightChange}
                          className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>

                      {tripType === "roundTrip" && (
                        <div className="space-y-1">
                          <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                            RETURN DATE
                          </label>
                          <input
                            type="date"
                            name="returnDate"
                            value={flightForm.returnDate}
                            onChange={handleFlightChange}
                            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />
                        </div>
                      )}
                    </div>

                    {/* Amount box */}
                    <div className="rounded-md border border-slate-200 px-3 py-3 bg-slate-50 flex items-center justify-between mt-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-600">
                        Dummy Ticket Amount
                      </span>
                      <span className="text-sm sm:text-base font-bold text-sky-700">
                        ₹ 1000
                      </span>
                    </div>
                  </>
                )}

                {/* Insurance tab */}
                {activeTab === "insurance" && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                        NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={insuranceForm.name}
                        onChange={handleInsuranceChange}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={insuranceForm.email}
                        onChange={handleInsuranceChange}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                        MOBILE NO
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={insuranceForm.mobile}
                        onChange={handleInsuranceChange}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                        DESTINATION
                      </label>
                      <input
                        type="text"
                        name="destination"
                        placeholder="Country / region you are travelling to"
                        value={insuranceForm.destination}
                        onChange={handleInsuranceChange}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                          DATE
                        </label>
                        <input
                          type="date"
                          name="travelDate"
                          value={insuranceForm.travelDate}
                          onChange={handleInsuranceChange}
                          className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
                          DATE OF BIRTH
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={insuranceForm.dob}
                          onChange={handleInsuranceChange}
                          className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-colors"
                >
                  {activeTab === "dummyTicket"
                    ? "Buy Dummy Ticket"
                    : "Submit Insurance Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DummyTicketBooking;
