export default function StartTrialBtn (props : {text : string}) {
    return (
        <button className="start-trial-btn">
            {props.text}
        </button>
    );
}