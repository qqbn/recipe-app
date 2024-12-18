interface Props {
    handleSetActive: () => void;
    active: boolean;
}
const Switcher = ({ handleSetActive, active }: Props) => {
    return (
        <>
            <div className='min-w-full flex mt-8 justify-center'>
                <button className={"btn" + (!active ? " btn-green btn-active" : "")} onClick={handleSetActive}>Search</button>
                <button className={"btn" + (active ? " btn-green btn-active" : "")} onClick={handleSetActive}>Saved Notes</button>
            </div>
        </>

    )
}

export default Switcher