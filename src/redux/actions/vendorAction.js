// import axios from "axios";

// const isLoading = () => {
//     return { type: 'NEAR_BY_VENDOR' }
// }
// const nearByVendorsSuccess = (vendor) => {
//     return { type: 'NEAR_BY_VENDORS_SUCCESS', data: vendor }
// }

// const failure = (message) => {
    
//     return { type: "FAILURE_VENDOR", error: message }
// } 


// // export const nearByVendors = (locationDetails) => async (dispatch) => {
// //     dispatch(isLoading());
// //     console.log(locationDetails)
// //     try {
// //         const response = await axios.post("https://helpkey-backend.vercel.app/api/listings", locationDetails);
// //         //console.log(response.data);
// //         const { vendors } = response.data; // Assuming API returns token & user info

// //         dispatch(nearByVendorsSuccess(vendors));

// //     } catch (error) {
// //         console.log(error)
// //             ; dispatch(failure(error?.message || "Something went wrong"));
// //     }
// // };
// export const nearByVendors = (locationDetails) => async (dispatch) => {
//     dispatch(isLoading());
    
//     try {
//         const response = await axios.get("https://helpkey-backend.vercel.app/api/listings", {
//             location: locationDetails.city // ✅ Send "location" instead of "city"
//         });

//         const { vendors } = response.data;
//         dispatch(nearByVendorsSuccess(vendors));

//     } catch (error) {
//         console.log(error);
//         dispatch(failure(error?.message || "Something went wrong"));
//     }
// };


// const selectHotel =(hotel)=>
// {
//    return {type:"SELECT_HOTEL",data:hotel}
// }



import axios from "axios";

// Action Types
const IS_LOADING = 'NEAR_BY_LISTINGS';
const NEAR_BY_LISTINGS_SUCCESS = 'NEAR_BY_LISTINGS_SUCCESS';
const FAILURE_LISTINGS = 'FAILURE_LISTINGS';

// Actions
const isLoading = () => {
    return { type: IS_LOADING };
}

const nearByListingsSuccess = (listings) => {
    return { type: NEAR_BY_LISTINGS_SUCCESS, data: listings };
}

const failure = (message) => {
    return { type: FAILURE_LISTINGS, error: message };
}

// Thunk Action to fetch Nearby Listings
export const nearByListings = (locationDetails) => async (dispatch) => {
    dispatch(isLoading());
    
    try {
        // Fetch listings with the location query parameter
        const response = await axios.get("https://helpkey-backend.onrender.com/api/listings", {
            params: { location: locationDetails.city }
        });

        // Assuming response.data.data contains the listings
        const { listings } = response.data; // Make sure this matches your backend's structure

        console.log("action",listings);
        // Dispatch success with the data
        dispatch(nearByListingsSuccess(listings));

    } catch (error) {
        console.error(error);
        dispatch(failure(error?.message || "Something went wrong"));
    }
};

// Select hotel action
export const selectHotel = (hotel) => {
    return { type: "SELECT_HOTEL", data: hotel };
}

