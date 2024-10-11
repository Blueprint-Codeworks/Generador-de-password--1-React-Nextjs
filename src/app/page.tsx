// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import SocialSection from "./components/socialSection/page";
export default function Home() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [error, setError] = useState("");

  const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
  const NUMBER_CHARS = "0123456789";
  const SYMBOL_CHARS = "!@#$%^&*()_+[]{}<>?,./";

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    let chars = "";
    if (includeUppercase) chars += UPPERCASE_CHARS;
    if (includeLowercase) chars += LOWERCASE_CHARS;
    if (includeNumbers) chars += NUMBER_CHARS;
    if (includeSymbols) chars += SYMBOL_CHARS;

    if (!chars) {
      setError(
        "Por favor, selecciona al menos una opción para generar la contraseña."
      );
      setPassword("");
      return;
    }

    setError("");

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert("Contraseña copiada al portapapeles!");
    } else {
      alert("No hay contraseña para copiar.");
    }
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Generador de Contraseñas</h1>
        <p className="description">Explora nuestro generador de contraseñas</p>

        <div className="card">
          <div className="password-output-container">
            <input
              type="text"
              value={password}
              readOnly
              className="password-output"
              placeholder="Tu contraseña aparecerá aquí"
            />
            <button onClick={copyToClipboard} className="copy-button">
              Copiar
            </button>
          </div>

          <div className="options-container">
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />{" "}
              Incluir mayúsculas
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />{" "}
              Incluir minúsculas
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />{" "}
              Incluir números
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />{" "}
              Incluir símbolos
            </label>
          </div>

          <div className="password-length-container">
            <label htmlFor="passwordLength" className="label-range">
              Longitud de la contraseña: <span>{passwordLength}</span>
            </label>
            <input
              type="range"
              id="passwordLength"
              min="4"
              max="20"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="range-input"
            />
          </div>

          <button onClick={generatePassword} className="generate-button">
            Generar Contraseña
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>
        <SocialSection />
      </main>
    </div>
  );
}
