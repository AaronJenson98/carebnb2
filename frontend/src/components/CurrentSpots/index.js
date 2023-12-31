import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUserSpots } from "../../store/spotsReducer";
import { SpotCard } from "../SpotCard";
import './currentSpots.css';
import OpenModalButton from "../OpenModalButton";
import { DeleteSpotModal } from "../DeleteSpotModal";
import { SpotForm } from "../SpotForm";

export const CurrentSpots = () => {
      const dispatch = useDispatch();
      const user = useSelector((state) => state.session.user);
      const allSpots = Object.values (useSelector(state => (state.spots ? state.spots : [])))
      const spots = allSpots.filter(spot => spot.ownerId == user.id)

      const updateSpot = () => {
            return <SpotForm />
      }

      useEffect( () => {
            dispatch(fetchCurrentUserSpots())
      }, [dispatch, user])

      if (user && spots) {

            return (
                  <>
                        <div id='manageYourSpot'>
                              <h2 >Manage Spots</h2>

                              {
                                    spots.length < 1 ?
                                          <Link to='/spots/new'>
                                          <button id='create-current-page'>Create a new Spot</button>
                                          </Link>
                                          :
                                          <p></p>

                              }


                        </div>

                        <section className="card-holder">

                        {
                              spots.map((spot) => (
                                    <div id='card'>

                                          <SpotCard spot={spot} key={spot.id} />
                                          <NavLink exact to={`/spots/update/${spot.id}`}  >

                                          <button id='updateButtManPage'>Update</button>

                                          </NavLink>

                                          <OpenModalButton
                                                buttonText="Delete"
                                                modalComponent={<DeleteSpotModal spot={spot} />}
                                          />
                                    </div>

                              ))

                        }


                  </section>

                  </>
            )
      }


}
