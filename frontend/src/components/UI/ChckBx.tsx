
import classes from "../../accets/styles/components/UI/chckBx.module.scss";
import classNames from 'classnames';
import { Form } from "react-bootstrap";
import { PropsCheck } from "../../services/typing/interfaces/components/UI/chckBx.interfaces";


const ChckBx:React.FC<PropsCheck> = ({id, state, setState}) => {
    return (
        <div className={classes.main}>
            <Form.Check
                className={classes.main__check}
                type={"checkbox"}
                checked={state}
                onChange={() => setState()}
                id={`default-${id}`}
                // label={`default ${type}`}
            />
        </div>
    )
}

export default ChckBx