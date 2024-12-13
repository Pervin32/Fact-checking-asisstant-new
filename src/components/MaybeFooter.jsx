import React, { useEffect, useState } from 'react' // React və lazım olan hook-ları import edirik
import { useLocation } from 'react-router-dom' // React Router'dan useLocation hook-u import edirik

// MaybeFooter komponenti, uşaqlarını göstərmə və ya gizlətmə funksiyasını təmin edir
const MaybeFooter = ({ children }) => {

    // Hal-hazırda istifadəçinin hansı səhifədə olduğunu əldə edirik
    const location = useLocation();

    // Footer-i göstərmək və ya gizlətmək üçün vəziyyət (state) təyin edirik
    const [showFooter, setShowFooter] = useState(false);

    // useEffect hook-u ilə, səhifənin URL-si dəyişdikdə footer-in göstərilməsini və ya gizlədilməsini idarə edirik
    useEffect(() => {
        // Əgər istifadəçi müəyyən səhifələrdədirsə (login, registration, textinput, loading, result, forgetpassword), footer-i gizlət
        if (location.pathname === '/login' || location.pathname === '/registration' || location.pathname === '/textinput' || location.pathname === '/loading' || location.pathname === '/result' || location.pathname === '/forgetpassword' ){
            setShowFooter(false) // Footer-i gizlət
        } else {
            setShowFooter(true) // Əks halda footer-i göstər
        }
    }, [location]) // location dəyişdikdə useEffect yenidən işə düşəcək

    // Komponentin renderi
    return (
        <div>
            {/* showFooter doğru olduqda uşaqlarını (children) göstər */}
            {showFooter && children}
        </div>
    )
}

export default MaybeFooter
