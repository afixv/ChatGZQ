import { Button } from "../Button";
import { Input } from "../Form/Input";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  date: string;
  weight: string;
  height: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    weight: "",
    height: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Konversi nilai ke number sebelum dikirim
    const payload = {
      date: formData.date,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
    };

    try {
      const response = await fetch("/api/add-measurement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setFormData({ date: "", weight: "", height: "" }); // Reset form
        window.location.reload(); // Reload halaman
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Tanggal Pengukuran"
          id="date"
          type="date"
          placeholder="Masukkan tanggal pengukuran"
          required
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <Input
          label="Berat Badan Anak (kg)"
          id="weight"
          type="number"
          placeholder="Masukkan berat badan anak"
          step=".01"
          required
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <Input
          label="Tinggi Badan Anak (cm)"
          id="height"
          type="number"
          step=".01"
          placeholder="Masukkan tinggi badan anak"
          required
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="primary" className="w-full py-3 text-white">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
