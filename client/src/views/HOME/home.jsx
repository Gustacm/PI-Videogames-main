import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import "./home.css"; 

function Home() {
    return (
        <div className="home-container">
            <h1>Estoy en el Home</h1>
            <Navbar />
            <Cards />
        </div>
    );
}

export default Home;
