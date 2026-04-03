import Image from "next/image"

export default function LoginPage() {
  return (
    <>
    <main className="flex min-h-screen">
      <div className="flex-[2] relative flex flex-col justify-center p-20 overflow-hidden">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover -z-10"
          loading="eager"
        />  
        <div className="absolute inset-0 bg-white/50 z-0" />
        <div className="relative z-10">
          <h1 className="text-6xl font-bold text-black mb-2">InvestPlan</h1>
          <p className="max-w-lg text-lg">
            Belajar simulasi investasi saham dan reksadana, serta modul edukasi risiko, melalui InvestPlan.
          </p>
        </div>

        <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-8 text-gray-600 font-medium">
          <a href="/faq" className="hover:text-blue-600">FAQ</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy</a>
          <a href="/support" className="hover:text-blue-600">Support</a>
        </nav>
      </div>



      <div className="flex-1 w-[420px] min-h-screen flex items-center justify-center relative p-12">
        <Image
          src="/bg_sign.png"
          alt="Background"
          fill
          className="object-cover -z-10"
          loading="eager"/>
        <div className="relative z-10 w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-center text-2xl font-bold text-black mb-1">Login</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Masuk kembali ke akun InvestPlan milik Anda</p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex justify-end text-sm">
                <a href="/forgot" className="text-blue-600 hover:underline">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-gray-500 text-sm">
              Didn’t have an account? <a href="/signup" className="font-semibold text-black">Sign Up</a>
            </p>
          </div>

        </div>
      </div>
    </main>
    </>
  )
}
