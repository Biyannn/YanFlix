import { useState } from "react";
import Button from "../components/Button/Button";
import GoogleAuthButton from "../components/GoogleAuth/GoogleAuth";
import InputField from "../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../components/UserProfile/UseAuthStore";

function RegisterPage() {
  const { register, error } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);       // <–– state proses
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (form.password !== form.confirm) {
      setLocalError("Password tidak cocok");
      return;
    }
    try {
      setLoading(true);
      await register(form.username, form.password);
      navigate("/login");
    } catch {
      // error ditangani di store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/assets/Images/background.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-[#181A1CD6] w-full max-w-md rounded-md p-6 sm:p-8"
      >
        <div className="flex justify-center items-center py-2">
          <img src="/assets/Icons/Cinema.png" alt="Logo" className="w-11 h-9" />
          <h1 className="text-white text-4xl font-bold px-2">YAN</h1>
        </div>
        <div className="flex flex-col items-center pt-2 pb-4">
          <h2 className="text-white text-3xl font-semibold">Daftar</h2>
          <p className="text-white text-base font-normal">Selamat datang</p>
        </div>

        <InputField label="Username" name="username" value={form.username} onChange={handleChange} placeholder="Masukkan Username" />
        <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Masukkan Password" />
        <InputField label="Confirm Password" type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Konfirmasi Password" />

        <div className="text-white text-base py-2">
          <p className="font-normal">
            Sudah punya akun? <a href="/login"><span className="font-semibold">Masuk</span></a>
          </p>
        </div>

        <div className="space-y-3">
          {(localError || error) && (
            <p className="text-red-500 text-sm">{localError || error}</p>
          )}

          {/* Tombol: disabled + teks proses */}
          <Button
            text={loading ? "Memproses…" : "Daftar"}
            disabled={loading}
          />

          <p className="text-white text-base font-normal text-center">Atau</p>
          <GoogleAuthButton />
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
