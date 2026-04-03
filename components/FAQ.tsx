"use client"
import { useState, useRef } from "react"

const faqData = [
  { q: "Apa itu saham?", a: "Saham adalah bukti kepemilikan seseorang dalam sebuah perusahaan. Dengan memiliki saham, investor berhak memperoleh sebagian keuntungan perusahaan dan berpartisipasi dalam rapat umum pemegang saham (RUPS)." },
  { q: "Apa itu reksadana?", a: "Reksadana adalah wadah yang digunakan untuk menghimpun dana dari masyarakat pemodal, yang kemudian diinvestasikan oleh manajer investasi ke dalam portofolio efek seperti saham, obligasi, atau pasar uang." },
  { q: "Apa itu diversifikasi?", a: "Diversifikasi adalah strategi investasi dengan menyebar dana ke berbagai jenis aset, sektor, atau instrumen untuk mengurangi risiko kerugian. Tujuannya agar jika satu aset turun, aset lain bisa menyeimbangkan." },
  { q: "Apa risiko utama investasi?", a: "Risiko utama meliputi: \n- Risiko pasar: fluktuasi harga aset \n- Risiko likuiditas: sulit menjual aset dengan cepat \n- Risiko inflasi: daya beli menurun \n- Risiko suku bunga: perubahan suku bunga memengaruhi nilai aset" },
  { q: "Apa perbedaan saham dan reksadana?", a: "Saham: investor langsung membeli bagian dari perusahaan. \nReksadana: dana dikelola oleh manajer investasi, cocok untuk pemula yang ingin investasi tanpa analisis mendalam." },
  { q: "Apakah investasi selalu untung?", a: "Tidak. Investasi memiliki potensi keuntungan dan risiko kerugian. Penting untuk memahami profil risiko dan tujuan keuangan sebelum berinvestasi." },
  { q: "Bagaimana cara memulai investasi?", a: "Tentukan tujuan keuangan, kenali profil risiko, pilih instrumen yang sesuai, mulai dengan jumlah kecil dan belajar dari simulasi." },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <section className="pt-16">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Question</h3>
        <div className="space-y-6">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="relative rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100"
              >
                <button
                  className="cursor-pointer w-full flex items-center justify-between gap-4 px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-100"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 ">
                    <div className="flex-none w-9 h-9 rounded-full bg-gray-100 text-sm text-gray-600 font-semibold flex items-center justify-center">{i + 1}</div>
                    <span className="text-gray-800 font-medium">{item.q}</span>
                  </div>

                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  className={`px-6 text-gray-600 overflow-hidden transition-all duration-300`}
                  style={{ maxHeight: isOpen && contentRefs.current[i] ? `${contentRefs.current[i]!.scrollHeight}px` : '0px' }}
                >
                  <div className={`transform transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                      <p className="pb-4 leading-relaxed whitespace-pre-line">{item.a}</p>
                    </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
