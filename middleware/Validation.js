class Validations {
    constructor(){
        this.messages = 
        {
            server: 'Désolé, une erreur interne est intervenue.',
            username : 'Désolé, ce nom d\'utilisateur est déjà utilisé.',
            role : 'Désolé, ce nom de rôle est déjà utilisé.',
            name : 'Désolé, ce nom est déjà utilisé.',
            mail : 'Désolé, l\'adresse email est déjà utilisé.',
            isbn_product:'Désolé, cet ISBN est déjà attribué à un produit.',
            isbn_editor:'Désolé, cet ISBN est déjà attribué à un éditeur.',
            isbn_country:'',
            uuid:'Désolé, cet UUID est déjà utilisé.',
            isbn_article:'Désolé, cet ISBN article est déjà utilisé.',
            title:'Désolé, ce titre est déjà utilisé.',
            authors:'',
            metadata:'',
            nav:'', 
            editor_id:'',

        }
        this.regex = {
            username: /^[A-Za-zÀ-ÖØ-öø-ÿ-\-][^0-9_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/,
            name: /^[A-Za-zÀ-ÖØ-öø-ÿ-\-][^_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/,
            mail:  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            message:  /[a-zA-Z0-9_!?÷+=@#$%ˆ&*()~;:][^¡¿\\\{}|``<>[\]]{0,}$/,
            isbn_product: /^[0-9]{3,}$/,
            isbn_country: /^[0-9]{2,}$/,
            isbn_editor: /^[0-9]{5,}$/,
            uuid: /^[0-9]{1,7}$/,
            isbn_article: /^[0-9]{7,}$/,
            title: /^[A-Za-zÀ-ÖØ-öø-ÿ-\-][^_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/,
            authors: /^[A-Za-zÀ-ÖØ-öø-ÿ-\-,][^_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:.[\]]{2,}$/,
            metadata: /^\{".*":.*\}/,
            nav:  /^\{".*":.*\}/,
            editor_id: /^[0-9]/,
            user_id: /^[0-9]/,
        }
        this.valid = 
        {
            username:'Le nom est invalide il doit comporter au moins deux caratères et ne peut contenir que des lettres ou le tiret (-).',
            mail:'L\'adresse email est invalide.',
            name: 'Le nom est invalide il doit comporter au moins deux caratères et ne peut contenir que des lettres, des chiffres ou le tiret (-).',
            password: 'Le mot de passe est incorrect, il doit contenir au moins 8 caractères dont un chiffre,une minuscule, une majuscule et un caratère spécial.',
            passwordConfirme: 'Les deux mots de passe ne sont pas identiques.',
            role:'Le nom est invalide il doit comporter au moins deux caratères et ne peut contenir que des lettres, des chiffres ou le tiret (-).',
            isbn_product:'L\'ISBN du produit est invalide. il doit être composé de trois chiffres.',
            isbn_editor:'L\'ISBN de l\éditeur est invalide. il doit être composé de cinq chiffres.',
            isbn_country:'L\'ISBN du pays est invalide. il doit être composé de deux chiffres.',
            uuid:'L\'UUID est invalide. il doit être composé de un à sept chiffres.',
            isbn_article:'L\'ISBN de l\'article est invalide. il doit être composé de sept chiffres.',
            title:'Le titre est invalide il doit comporter au moins deux caratères et ne peut contenir que des lettres, des chiffres, des espaces ou le tiret (-).',
            authors:'Le champs des auteurs est invalide il doit comporter au moins deux caratères et ne peut contenir que des lettres, des espaces ou le tiret (-).',
            metadata:'Le champs metadata est invalide',
            nav:'Le champs nav est invalide',
            editor_id:'Le champs Id éditeur est invalide',
            user_id:'Le champs Id utilisateur est invalide',
        }
    }

    checkers = (entity,fieldControls) =>{
        const validations = {};
        fieldControls.forEach(field => {
            validations[field] = this.regex[field].test(String(entity[field]))
            ? false : this.valid[field] ;
        });    
        return validations;
    }

    registrationCheck(user,passwordConfirme) {
        const validations = this.checkers(user,['username','mail','password']);
        validations.passwordConfirme = user.password === passwordConfirme ? false : this.valid.passwordConfirme;
        return validations;
    }
}
exports.validations = new Validations();