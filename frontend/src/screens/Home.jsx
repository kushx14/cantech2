import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Card from '../components/card';
import Carousal from '../components/carousal';

function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState(''); // Added search state

    const loadData = async () => {
        let response = await fetch("https://cantech0.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        response = await response.json();
        setFoodItems(response[0] || []);
        setFoodCat(response[1] || []);
    };

    useEffect(() => {
        loadData();
    }, []); // Dependency array ensures this runs only once

    return (
        <div>
            <Navbar />
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
      <div className="carousel-inner" style={{maxHeight:"500px"}}>
        <div className='carousel-caption' style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    value={search}
    onChange={(e)=>{
        setSearch(e.target.value)
    }}
  />

</div>

        </div>
      <div className="carousel-item active">
        <img src="https://picsum.photos/seed/picsum/900/400" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
      </div>
      <div className="carousel-item">
        <img src="https://picsum.photos/900/400" className="d-block w-100"style={{filter: "brightness(30%)"}} alt="..." />
      </div>
      <div className="carousel-item">
        <img src="https://picsum.photos/900/400/?blur" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div> 
  
     <div className='container'> {/* Bootstrap is mobile-first */}
                {
                    foodCat.length > 0 ? foodCat.map((data) => (
                        <div className='row mb-3' key={data.id}>
                            <div className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr
                                id="hr-success"
                                style={{
                                    height: "4px",
                                    backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))"
                                }}
                            />
                            {foodItems.length > 0 ? foodItems
                                .filter(
                                    (item) =>
                                        item.CategoryName === data.CategoryName &&
                                        item.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((filteredItem) => (
                                    <div key={filteredItem.id} className='col-12 col-md-6 col-lg-3'>
                                        <Card
                                            foodItem = {filteredItem}
                                            item={filteredItem}
                                            options={filteredItem.options[0]}
                                            ImgSrc={filteredItem.img}
                                        />
                                    </div>
                                )) : <div>No Such Data</div>}
                        </div>
                    )) : <div>Loading...</div>
                }
            </div>
            <Footer />
        </div>
    );
}

export default Home;
