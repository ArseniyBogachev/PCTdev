
import classes from "../../accets/styles/pages/menu/product.module.scss";
import classNames from "classnames";
import Button from "react-bootstrap/Button";

const Product = ({
    
}: any) => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <Button variant="primary">Primary</Button>
                </div>
            </div>
        </div>
    )
}

export default Product