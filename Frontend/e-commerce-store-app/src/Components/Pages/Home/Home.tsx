import "./home.css";
import heroImg from "../../../assets/images/hero.png";

export default function Home() {
    return (
        <>
            <section className="home-hero-section">
                <img className="home-hero-img" src={heroImg}></img>
                {/* <p className="home-hero-title">Fashion Store</p> */}
            </section>
            <section className="home-featured-section">
                <div className="home-featured-category">
                    <p>New Arrivals</p>
                    <div className="home-featured-group">
                        <div className="home-featured-item">
                            <img src="" alt="item"></img>
                            <p>Item</p>
                            <button>Buy</button>
                        </div>
                        <div className="home-featured-item">
                            <img src="" alt="item"></img>
                            <p>Item</p>
                            <button>Buy</button>
                        </div>
                    </div>
                </div>
                <div className="home-featured-category">
                    <p>Best Sellers</p>
                    <div className="home-featured-group">
                        <div className="home-featured-item">
                            <img src="" alt="item"></img>
                            <p>Item</p>
                            <button>Buy</button>
                        </div>
                        <div className="home-featured-item">
                            <img src="" alt="item"></img>
                            <p>Item</p>
                            <button>Buy</button>
                        </div>
                    </div>
                </div>
                <div className="home-featured-category">
                    <p>Sale</p>
                    <div className="home-featured-group">
                        <div className="home-featured-item">
                            <img src="" alt="item"></img>
                            <p>Item</p>
                            <button>Buy</button>
                        </div>
                        <div className="home-featured-item">
                            <img src="" alt="item"></img>
                            <p>Item</p>
                            <button>Buy</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
