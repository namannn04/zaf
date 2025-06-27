'use client';

import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "@/store/formSlice";
import { RootState } from "@/store/store";

export default function FormPage() {
    const form = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateForm({ [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        const res = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await res.json();
        if (result.success) {
            alert('Form submitted successfully!');
        }
        else {
            alert('Failed to submit form.');
        }
    };

    return (
        <div>
            <h1>Application Form</h1>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
            <input name="resume" value={form.resume} onChange={handleChange} placeholder="Resume Link" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}