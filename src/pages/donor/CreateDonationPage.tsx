import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormField, TextArea, TextInput } from "../../components/FormField";
import { Icon } from "../../components/Icon";
import { PageHeader } from "../../components/PageHeader";
import { useApp } from "../../context/AppContext";
import { DonorShell } from "./DonorShell";

const initialForm = {
  foodName: "",
  quantity: "",
  expiryTime: "",
  pickupAddress: "",
  imageName: "",
  imageDataUrl: "",
};

export function CreateDonationPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const { createDonation } = useApp();
  const navigate = useNavigate();

  const update = (key: keyof typeof form, value: string) => {
    setForm((existing) => ({ ...existing, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const required = [form.foodName, form.quantity, form.expiryTime, form.pickupAddress];
    if (required.some((value) => !value.trim())) {
      setError("Please complete all required donation fields.");
      return;
    }
    createDonation(form);
    navigate("/donor/donations");
  };

  return (
    <DonorShell>
      <PageHeader title="Create Donation" description="Register surplus food with the details receivers need to make fast decisions." />
      <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-2">
          <FormField label="Food Name">
            <TextInput value={form.foodName} onChange={(event) => update("foodName", event.target.value)} placeholder="Fresh vegetable biryani" />
          </FormField>
          <FormField label="Quantity">
            <TextInput value={form.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="25 meal boxes" />
          </FormField>
          <FormField label="Expiry Time">
            <TextInput type="datetime-local" value={form.expiryTime} onChange={(event) => update("expiryTime", event.target.value)} />
          </FormField>
          <div className="lg:col-span-2">
            <FormField label="Location">
              <TextArea value={form.pickupAddress} onChange={(event) => update("pickupAddress", event.target.value)} placeholder="Pickup location, street, city, landmark" />
            </FormField>
          </div>
          <div className="lg:col-span-2">
            <FormField label="Food Image Upload">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-field px-6 py-8 text-center hover:border-herb">
                {form.imageDataUrl ? (
                  <img
                    src={form.imageDataUrl}
                    alt="Selected food preview"
                    className="mb-4 h-40 w-full max-w-sm rounded-xl object-cover"
                  />
                ) : null}
                <Icon name="upload" className="text-herb" size={28} />
                <span className="mt-3 text-sm font-semibold text-ink">{form.imageName || "Choose an image file"}</span>
                <span className="mt-1 text-xs text-slate-500">The selected image is previewed and stored in local session state.</span>
                <input
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      setForm((existing) => ({ ...existing, imageName: "", imageDataUrl: "" }));
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () =>
                      setForm((existing) => ({
                        ...existing,
                        imageName: file.name,
                        imageDataUrl: typeof reader.result === "string" ? reader.result : "",
                      }));
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            </FormField>
          </div>
        </div>
        {error ? <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <div className="mt-6 flex justify-end">
          <Button type="submit">Submit Donation</Button>
        </div>
      </form>
    </DonorShell>
  );
}
