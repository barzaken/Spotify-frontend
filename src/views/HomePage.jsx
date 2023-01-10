import { useDispatch } from "react-redux"
import { CategoryList } from "../cmps/CategoryList"
import { loadStations } from "../store/actions/station.actions"

export const HomePage = () => {
    const dispatch = useDispatch()
    dispatch(loadStations())
    return (
        <section className="home-page main-layout">
            <div className="div">
                <h1>Welcome User</h1>
            </div>
            <CategoryList />
        </section>
    )

}