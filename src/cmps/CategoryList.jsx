import { StationList } from "./StationList"

export const CategoryList = () => {
    return (
        <div className="category-list">
            <div className="category-container">
                <h1>New</h1>
            <div className="category">
                <StationList />
            </div>
            </div>
            <div className="category-container">
                <h1>Top 5</h1>
            <div className="category">
                <StationList />
            </div>
            </div>
            <div className="category-container">
                <h1>Top 5</h1>
            <div className="category">
                <StationList />
            </div>
            </div>
        </div>
    )
}