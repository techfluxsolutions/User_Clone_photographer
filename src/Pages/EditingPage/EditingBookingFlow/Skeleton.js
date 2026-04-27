export default function PackageSkeleton() {
    return (
        <div className="ebf-package-card skeleton-card">
            <div className="ebf-package-header">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-price"></div>
            </div>

            <ul className="ebf-package-features">
                {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                        <div className="skeleton skeleton-feature"></div>
                    </li>
                ))}
            </ul>

            <div className="ebf-package-footer">
                <div className="skeleton skeleton-btn"></div>
            </div>
        </div>
    );
};