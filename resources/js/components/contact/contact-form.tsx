export default function ContactForm() {
    return (
      <form action="#" method="POST" className="flex flex-col gap-4 p-2 lg:p-6 rounded-md">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Nama <span className="text-red-600">*</span>
          </label>
          <input
            className="border border-gray-600 px-3 py-2 rounded-md"
            type="text"
            id="name"
            name="name"
            placeholder="Masukkan nama lengkap..."
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            className="border border-gray-600 px-3 py-2 rounded-md"
            type="email"
            id="email"
            name="email"
            placeholder="Masukkan alamat email..."
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-semibold">
            Pesan <span className="text-red-600">*</span>
          </label>
          <textarea
            className="border border-gray-600 px-3 py-2 rounded-md"
            rows={4}
            id="message"
            name="message"
            placeholder="Masukkan pesan..."
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-blue-400 text-blue-700 px-4 py-2 rounded-md font-semibold"
        >
          Kirim
        </button>
      </form>
    );
  }
  