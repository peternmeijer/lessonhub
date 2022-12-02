import { useNavigate } from 'react-router-dom';

const checkRedirect = () =>{
    //used for redirection of requests
    const navigate = useNavigate();

    try{
        const user_accountType = JSON.parse(localStorage.getItem("user")).accountType
        if(user_accountType== "Administrator")
        {
            navigate('/admin');
        }
        else if(user_accountType=="Student")
        {
            navigate('/courses');
        }
    }catch (error)
    {
        navigate('/about');
    }
}

export default checkRedirect