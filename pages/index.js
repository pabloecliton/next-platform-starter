import { useState } from 'react';
import GoogleCaptcha from '../components/GoogleCaptcha';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const captchaToken = await GoogleCaptcha();

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        nome: formData.get('nome'),
        email: formData.get('email'),
        problema: formData.get('problema'),
        descricao: formData.get('descricao'),
        anexo: formData.get('anexo').name,
        captcha: captchaToken
      })
    });

    if (response.ok) {
      alert('Chamado enviado!');
      e.target.reset();
    } else {
      alert('Erro ao enviar. Tente novamente.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Logo */}
      <div className="text-center mb-12">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="mx-auto h-24 w-auto" 
        />
      </div>

      {/* Formulário */}
      <form 
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <div className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tipo de Problema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Problema
            </label>
            <select
              name="problema"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="tecnico">Problema Técnico</option>
              <option value="financeiro">Problema Financeiro</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descreva o Problema
            </label>
            <textarea
              name="descricao"
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Anexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anexar Fotos (PNG, JPG, PDF)
            </label>
            <input
              type="file"
              name="anexo"
              accept=".png,.jpg,.jpeg,.pdf"
              className="w-full"
            />
          </div>

          {/* CAPTCHA */}
          <div
            id="captcha"
            className="g-recaptcha" 
            data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          ></div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Chamado'}
          </button>
        </div>
      </form>
    </div>
  );
}