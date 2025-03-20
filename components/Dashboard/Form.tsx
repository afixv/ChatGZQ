import { Button } from "../Button";
import { Input } from "../Form/Input";

export default function Form() {
  return (
    <div className="p-4">
      <form className="space-y-4">
        <Input
          label="Tanggal Pengukuran"
          id="date"
          type="date"
          placeholder="Masukkan tanggal pengukuran"
          required
          name="date"
        />
        <Input
          label="Berat Badan Anak (kg)"
          id="weight"
          type="number"
          placeholder="Masukkan berat badan anak"
          required
          name="weight"
        />
        <Input
          label="Tinggi Badan Anak (cm)"
          id="height"
          type="number"
          placeholder="Masukkan tinggi badan anak"
          required
          name="height"
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
