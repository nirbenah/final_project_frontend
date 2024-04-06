import { CircularProgress } from "@mui/material";


interface LoaderProps {
    isPartial?: boolean;
}

const Loader: React.FC<LoaderProps> = ({isPartial = false}) => {
    if(isPartial){
        return (
            <div className="loader-container" style={{display: "flex", margin:"20px", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className="loader-container" style={{ minHeight: "100vh",  margin:"20px" ,display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>

    );
};

export default Loader;
