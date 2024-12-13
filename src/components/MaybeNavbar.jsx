import React, { useEffect, useState } from 'react' // React və lazım olan hook-ları import edirik
import { useLocation } from 'react-router-dom' // React Router'dan useLocation hook-u import edirik

// MaybeNavbar komponenti, navbar-ı göstərmək və ya gizlətmək üçün istifadə olunur
const MaybeNavbar = ({ children }) => {

    // Hal-hazırda istifadəçinin hansı səhifədə olduğunu əldə edirik
    const location = useLocation();

    // Navbar-ın göstərilməsi və ya gizlədilməsi üçün vəziyyət (state) təyin edirik
    const [showNavbar, setShowNavbar] = useState(false)

    // useEffect hook-u ilə, səhifənin URL-si dəyişdikdə navbar-ın göstərilməsini və ya gizlədilməsini idarə edirik
    useEffect(() => {
        // Əgər istifadəçi müəyyən səhifələrdədirsə (login, registration, textinput, loading, result, forgetpassword), navbar-ı gizlət
        if (location.pathname === '/login' || location.pathname === '/registration' || location.pathname === '/textinput' || location.pathname === '/loading' || location.pathname === '/result' || location.pathname === '/forgetpassword') {
            setShowNavbar(false) // Navbar-ı gizlət
        } else {
            setShowNavbar(true) // Əks halda navbar-ı göstər
        }
    }, [location]) // location dəyişdikdə useEffect yenidən işə düşəcək

    // Komponentin renderi
    return (
        <div>
            {/* showNavbar doğru olduqda uşaqlarını (children) göstər */}
            {showNavbar && children}
        </div>
    )
}

export default MaybeNavbar
