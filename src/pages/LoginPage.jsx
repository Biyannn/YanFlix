import { useState } from "react";
import Button from "../components/Button/Button";
import GoogleAuthButton from "../components/GoogleAuth/GoogleAuth";
import InputField from "../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../components/UserProfile/UseAuthStore";

export function LoginPage() {
  const { login, error } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); // <–– state proses
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(form.username, form.password);
      navigate("/homepage");
    } catch {
      // error ditangani di store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/assets/Images/background.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#181A1CD6] w-full max-w-md rounded-md p-6 sm:p-8"
      >
        <div className="flex justify-center items-center py-2">
          <img src="/assets/Icons/Cinema.png" alt="Logo" className="w-11 h-9" />
          <h1 className="text-white text-4xl font-bold px-2">YAN</h1>
        </div>
        <div className="flex flex-col items-center pt-2 pb-4">
          <h2 className="text-white text-3xl font-semibold">Masuk</h2>
          <p className="text-white text-base font-normal">
            Selamat datang kembali
          </p>
        </div>

        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Masukkan Username"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Masukkan Password"
        />

        <div className="text-white text-base flex justify-between py-2">
          <p>
            Belum Punya Akun?{" "}
            <a href="/">
              <span className="font-semibold">Daftar</span>
            </a>
          </p>
          <p className="underline">Lupa Kata Sandi</p>
        </div>

        <div className="space-y-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Tombol: disabled + teks proses */}
          <Button text={loading ? "Memproses…" : "Masuk"} disabled={loading} />

          <p className="text-white text-base font-normal text-center">Atau</p>
          <GoogleAuthButton />

          <div className="text-center mt-3">
  <button
    type="button"
    onClick={() => {
      // pastikan logout user sebelumnya
      useAuthStore.getState().logout();
      // redirect ke homepage tanpa login
      navigate("/homepage");
    }}
    className="text-gray-300 underline hover:text-white text-sm"
  >
    Lanjut tanpa login
  </button>
</div>
        </div>
      </form>
    </div>
  );
}
