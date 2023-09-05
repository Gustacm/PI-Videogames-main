import "./navbar.css"

function Navbar() {
  return (
    <div className="form-container"> {/* Agrega la clase "form-container" */}
      <form>
        <input type="text" placeholder="Búsqueda" />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Navbar;
