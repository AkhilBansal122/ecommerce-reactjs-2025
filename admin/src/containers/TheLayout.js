import React, { useEffect , useState} from 'react';
import { Outlet } from 'react-router-dom';
import TheHeader from '../views/Components/TheHeader/Header';
import TheFooter from '../views/Components/TheFooter/Footer';
import TheSidebar from '../views/Components/TheSidebar/Sidebar';
import "./layout.scss";


export default function TheLayout() {

	const [folded, setFolded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleFolded = () => {
        setFolded(!folded);
    };

    const handleNavLinkClick = () => {
        if (isMobile && folded) {
            setFolded(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (folded) {
            document.body.classList.add('is-folded');
        } else {
            document.body.classList.remove('is-folded');
        }
    }, [folded]);

	return (
		<div className="app" >
			<div className="dashBoard_overLay"></div>
			<div className="layout">
				<TheHeader toggleFolded={toggleFolded} handleNavLinkClick={handleNavLinkClick} />
				<TheSidebar toggleFolded={toggleFolded} handleNavLinkClick={handleNavLinkClick}  />
				<div className="page_container">
					<div className="main_content">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
