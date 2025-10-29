import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axiosInstance from '../../utils/axiosInstance';

type FormState = {
    date: string;
    time: string;
    vehicleType: string;
    vehicleNumber: string;
    serviceType: string;
    notes: string;
};

const initialForm: FormState = {
    date: '',
    time: '',
    vehicleType: '',
    vehicleNumber: '',
    serviceType: '',
    notes: '',
};

export default function BookingAppointment() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    function onChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target as HTMLInputElement;
        setForm((s) => ({ ...s, [name]: value }));
        setErrors((err) => {
            if (!err[name]) return err;
            const next = { ...err };
            delete next[name];
            return next;
        });
    }

    function validate(values: FormState) {
        const next: Record<string, string> = {};
        if (!values.date) next.date = 'Please select a date.';
        if (!values.time) next.time = 'Please select a time.';
        if (!values.serviceType) next.serviceType = 'Please choose a service type.';
        return next;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setServerError(null);
        setSuccessMsg(null);
        const next = validate(form);
        if (Object.keys(next).length) {
            setErrors(next);
            const firstKey = Object.keys(next)[0];
            const el = (document.getElementsByName(firstKey)[0] as HTMLElement | undefined);
            el?.focus?.();
            return;
        }

        // Build payload matching backend expectations
        const payload = {
            date: form.date, // YYYY-MM-DD
            time: form.time, // HH:mm
            vehicleType: form.vehicleType || null,
            vehicleNumber: form.vehicleNumber || null,
            serviceType: form.serviceType,
            instructions: form.notes || null,
            // Add customer contact fields for anonymous bookings
            customerName: null,
            customerEmail: null,
            customerPhone: null,
        };

        try {
            setLoading(true);
            // POST to /appointments — axiosInstance already sets baseURL and Authorization header
            const response = await axiosInstance.post('/appointments', payload);
            setSuccessMsg('Your appointment has been created.');
            setForm(initialForm);
            setErrors({});
            console.log('Appointment created', response.data);
        } catch (err: any) {
            console.error(err);
            // axios error shape
            const message = err?.response?.data?.message || err?.message || 'Failed to create appointment';
            setServerError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-screen bg-[var(--color-bg-primary)] py-16 px-4" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)]">Book a Service Appointment</h1>
                <p className="text-[var(--color-text-muted)] mt-2">Schedule your vehicle service in just a few steps</p>
            </div>

            <div className="max-w-3xl mx-auto bg-[var(--color-bg-secondary)] rounded-2xl p-8 md:p-10">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {successMsg && (
                        <div className="rounded-md bg-emerald-600 text-white px-4 py-3">{successMsg}</div>
                    )}
                    {serverError && (
                        <div className="rounded-md bg-rose-600 text-white px-4 py-3">{serverError}</div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col text-left">
                            <span className="text-base text-[var(--color-text-tertiary)] mb-2">Date</span>
                            <div className="relative">
                                <input
                                    name="date"
                                    ref={dateInputRef}
                                    value={form.date}
                                    onChange={onChange}
                                    type="date"
                                    aria-invalid={!!errors.date}
                                    aria-describedby={errors.date ? 'err-date' : undefined}
                                    required
                                    className="bg-[var(--color-bg-header)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] rounded-md px-3 py-2 pr-10 border border-[rgba(214,5,7,0.23)] w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                                <button
                                    type="button"
                                    aria-label="Open calendar"
                                    onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.focus()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--color-text-primary)]"
                                >
                                    <CalendarTodayIcon fontSize="small" />
                                </button>
                            </div>
                        </label>

                        <label className="flex flex-col text-left">
                            <span className="text-base text-[var(--color-text-tertiary)] mb-2">Time</span>
                            <select
                                name="time"
                                value={form.time}
                                onChange={onChange}
                                aria-invalid={!!errors.time}
                                aria-describedby={errors.time ? 'err-time' : undefined}
                                required
                                className="bg-[var(--color-bg-header)] text-[var(--color-text-primary)] rounded-md px-3 py-2 border border-[rgba(214,5,7,0.23)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            >
                                <option value="">Select time</option>
                                {[
                                    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
                                ].map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col text-left">
                            <span className="text-base text-[var(--color-text-tertiary)] mb-2">Vehicle Type</span>
                            <select name="vehicleType" value={form.vehicleType} onChange={onChange} className="bg-[var(--color-bg-header)] text-[var(--color-text-primary)] rounded-md px-3 py-2 border border-[rgba(214,5,7,0.23)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                                <option value="">Select vehicle type</option>
                                <option value="car">Car</option>
                                <option value="van">Van</option>
                                <option value="jeep">Jeep</option>
                                <option value="cab">Cab</option>
                            </select>
                        </label>

                        <label className="flex flex-col text-left">
                            <span className="text-base text-[var(--color-text-tertiary)] mb-2">Vehicle Number</span>
                            <input
                                name="vehicleNumber"
                                value={form.vehicleNumber}
                                onChange={onChange}
                                placeholder="Your vehicle number"
                                className="bg-[var(--color-bg-header)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] rounded-md px-3 py-2 border border-[rgba(214,5,7,0.23)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="flex flex-col text-left">
                            <span className="text-base text-[var(--color-text-tertiary)] mb-2">Service Type</span>
                            <select name="serviceType" value={form.serviceType} onChange={onChange} aria-invalid={!!errors.serviceType} aria-describedby={errors.serviceType ? 'err-serviceType' : undefined} required className="bg-[var(--color-bg-header)] text-[var(--color-text-primary)] rounded-md px-3 py-2 border border-[rgba(214,5,7,0.23)] w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                                <option value="">Select service type</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="repair">Repair</option>
                                <option value="inspection">Inspection</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="flex flex-col text-left">
                            <span className="text-base text-[var(--color-text-tertiary)] mb-2">Additional Instructions</span>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={onChange}
                                rows={6}
                                placeholder="Any additional info"
                                className="bg-[var(--color-bg-header)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] rounded-md px-3 py-3 border border-[rgba(214,5,7,0.23)] w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </label>
                    </div>

                    <div className="flex gap-4 justify-between">
                        <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-[var(--color-text-primary)] text-black py-2 rounded-md">Back</button>
                        <button type="submit" disabled={!form.date || !form.time || !form.serviceType || loading} className={`flex-1 py-2 rounded-md ${!form.date || !form.time || !form.serviceType ? 'bg-[var(--color-primary)]/60 text-white cursor-not-allowed opacity-70' : 'bg-[var(--color-primary)] text-white'}`}>
                            {loading ? 'Saving...' : 'Confirm Appointment'}
                        </button>
                    </div>

                    <div className="mt-1 text-sm text-rose-400">
                        {errors.date && <div id="err-date">{errors.date}</div>}
                        {errors.time && <div id="err-time">{errors.time}</div>}
                        {errors.serviceType && <div id="err-serviceType">{errors.serviceType}</div>}
                    </div>
                </form>
            </div>
        </section>
    );
}
