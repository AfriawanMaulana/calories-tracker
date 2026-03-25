import Navbar from "../components/ui/navbar";

export default function DataPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6 space-y-6 flex flex-col w-full">
        <h1 className="text-3xl">Data Anak</h1>
        <form className="flex flex-col w-full shadow-sm dark:shadow-white/10 border border-black/10 dark:border-white/10 p-4 rounded-2xl space-y-4">
          <fieldset className="flex flex-col gap-2">
            <label>Nama Anak</label>
            <input type="text" className="input w-full" required />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label>Usia Anak</label>
            <div className="flex gap-2">
              <input type="number" className="input w-full" required />
              <select defaultValue="Pick a color" className="select">
                <option>tahun</option>
                <option>bulan</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label>Berat Badan</label>
            <input type="number" className="input w-full" required />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label>Tinggi Badan</label>
            <input type="number" className="input w-full" required />
          </fieldset>

          <button type="submit" className="btn btn-success w-full text-white">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
