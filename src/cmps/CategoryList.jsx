import { StationList } from "./StationList"

export const CategoryList = () => {
    return (
        <div className="category-list">
            <div className="category">
                <h1>New</h1>
                <StationList />
            </div>
            <div className="category">
                <h1>Top 5</h1>
                <StationList />
            </div>
            <div className="category">
                <h1>Top 5</h1>
                <StationList />
            </div>
        </div>
    )
}