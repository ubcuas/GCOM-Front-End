import { Link } from "wouter";

const Navigation: React.FC = () => {
    return (
        <div>
            <Link href="/">Home</Link>
            <Link href="/map">Map</Link>
        </div>
    );
};

export default Navigation;
