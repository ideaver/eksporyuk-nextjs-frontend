import React from 'react';

interface LoadingUIProps {
    loading: boolean;
    error: string | undefined;
}

const LoadingUI: React.FC<LoadingUIProps> = ({ loading, error }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div
                    style={{
                        height: "75vh",
                    }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <h5>
                        {loading ? "Loading..." : error ? error : "Data Tidak Ditemukan"}
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default LoadingUI;