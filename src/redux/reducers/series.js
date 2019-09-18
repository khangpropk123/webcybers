const initialState = {
    series: []
}
export default (state=initialState, action) => {
        return {
            ...state,
            series: action.series
        }
}