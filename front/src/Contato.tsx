export default function Contato() {
  return (
    <section className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded shadow text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Contato</h1>
      <p className="text-lg mb-4 text-justify">
        Precisa de ajuda ou quer falar com a Ótica Avenida? Entre em contato pelos canais abaixo ou preencha o formulário que retornaremos o mais breve possível!
      </p>
      <ul className="mb-6 text-lg">
        <li><strong>Email:</strong> contato@oticaavenida.com.br</li>
        <li><strong>Telefone:</strong> (11) 99999-8888</li>
        <li><strong>Endereço:</strong> Av. Central, 1234 - Centro, Cidade/UF</li>
      </ul>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Seu nome" className="border rounded px-3 py-2" required />
        <input type="email" placeholder="Seu email" className="border rounded px-3 py-2" required />
        <textarea placeholder="Sua mensagem" className="border rounded px-3 py-2" rows={4} required />
        <button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded shadow hover:bg-blue-800 transition">Enviar</button>
      </form>
      <div className="text-center mt-8">
        <span className="text-blue-700 font-semibold">Ótica Avenida — Atendimento com carinho!</span>
      </div>
    </section>
  );
}
