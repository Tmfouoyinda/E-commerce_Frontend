import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { ShoppingBag, Mail, ArrowLeft } from 'lucide-react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!email) {
                setError('Veuillez entrer votre email');
                setLoading(false);
                return;
            }

            // TODO: Implémenter l'appel API pour réinitialiser le mot de passe
            console.log('Email de réinitialisation:', email);
            setSuccess(true);
            setEmail('');
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
            setLoading(false);
        }
    };

    return (
        <div>
                
        </div>
    );
}


export default ForgotPassword;