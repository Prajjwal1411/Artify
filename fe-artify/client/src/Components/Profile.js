import React, { useState, useEffect } from 'react';
import '../utils/Assets/CSS/Profile.css';
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import ProductCard from '../Reusables/ProductCard';

const Profile = () => {
    const [selectedCategory, setSelectedCategory] = useState('Created');
    const [underlineWidth, setUnderlineWidth] = useState('auto');
    const [underlinePosition, setUnderlinePosition] = useState(0);

    const categories = [
        { name: 'Created', count: 5 },
        { name: 'Owned', count: 3 },
        { name: 'Collection', count: 10 },
        { name: 'My Bids', count: 2 },
    ];

    useEffect(() => {
        const selectedElement = document.querySelector('.category-item.selected');
        if (selectedElement) {
            setUnderlinePosition(selectedElement.offsetLeft);
            setUnderlineWidth(selectedElement.offsetWidth);
        }
    }, [selectedCategory]);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const handleEditProfileClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="profile-page-container">
            <Header />
            <div className="background-image">
                <img
                    className="banner"
                    src="https://cdn.pixabay.com/photo/2022/10/10/07/58/mountain-7511116_1280.jpg"
                    alt="Background"
                />
                <div className="profile-photo">
                    <img
                        src="https://media.istockphoto.com/id/1835504092/photo/the-bobcat-also-known-as-the-red-lynx-is-a-medium-sized-cat-native-to-north-america-it-ranges.jpg?s=2048x2048&w=is&k=20&c=I9vLSFG7fqt9V_07air8WacQ12evZZYaq1IYVGCifrE="
                        alt="Profile"
                    />
                </div>
            </div>

            <div className="user-info-section">
                <div className="user-info-header">
                    <h2>Space Monk</h2>
                    <button className="edit-profile-button" onClick={handleEditProfileClick}>
                        Edit Profile
                    </button>
                </div>
                <p>John Doe</p>
                <div className="artwork-stats">
                    <div className="stat-item">
                        <span className="number">250k+</span>
                        <span className="label">Total Artwork</span>
                    </div>
                    <div className="stat-item">
                        <span className="number">50+</span>
                        <span className="label">Artwork Sold</span>
                    </div>
                </div>
                <h3>Bio</h3>
                <p>Artist and design Maestro with years of experience.</p>
            </div>

            <div className="category-bar">
                {categories.map(category => (
                    <div
                        key={category.name}
                        className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        {category.name}
                        <span className="art-count">{category.count}</span>
                    </div>
                ))}
                <div
                    className="underline"
                    style={{
                        left: underlinePosition,
                        width: underlineWidth,
                    }}
                />
            </div>

            <div className="product-section">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <button className="view-more-button">View More</button>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
    