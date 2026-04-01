<form action="/submit" method="POST" enctype="multipart/form-data">
    <fieldset>
        <legend>Informations personnelles</legend>

        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom" placeholder="Votre nom" required maxlength="50" />

        <label for="prenom">Prénom</label>
        <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required />

        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="exemple@email.com" required />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" minlength="8" required />

        <label for="telephone">Téléphone</label>
        <input type="tel" id="telephone" name="telephone" placeholder="+33 6 00 00 00 00" />

        <label for="naissance">Date de naissance</label>
        <input type="date" id="naissance" name="naissance" />

        <label for="age">Âge</label>
        <input type="number" id="age" name="age" min="0" max="120" />
    </fieldset>

    <fieldset>
        <legend>Préférences</legend>

        <div>Sexe</div>
        <input type="radio" id="homme" name="sexe" value="homme" />
        <label for="homme">Homme</label>
        <input type="radio" id="femme" name="sexe" value="femme" />
        <label for="femme">Femme</label>

        <label for="pays">Pays</label>
        <select id="pays" name="pays">
            <optgroup label="Europe">
                <option value="">-- Sélectionnez --</option>
                <option value="fr">France</option>
                <option value="be">Belgique</option>
                <option value="ch">Suisse</option>
            </optgroup>
        </select>

        <label for="langues">Langues parlées</label>
        <select id="langues" name="langues" multiple size="3">
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
            <option value="de">Allemand</option>
        </select>

        <div>Centres d'intérêt</div>
        <input type="checkbox" id="sport" name="interets" value="sport" />
        <label for="sport">Sport</label>
        <input type="checkbox" id="musique" name="interets" value="musique" />
        <label for="musique">Musique</label>
        <input type="checkbox" id="tech" name="interets" value="tech" />
        <label for="tech">Technologie</label>
    </fieldset>

    <fieldset>
        <legend>Autres informations</legend>

        <label for="site">Site web</label>
        <input type="url" id="site" name="site" placeholder="https://exemple.com" />

        <label for="couleur">Couleur préférée</label>
        <input type="color" id="couleur" name="couleur" value="#0000ff" />

        <label for="satisfaction">Satisfaction (0-100)</label>
        <input type="range" id="satisfaction" name="satisfaction" min="0" max="100" step="5" />

        <label for="avatar">Photo de profil</label>
        <input type="file" id="avatar" name="avatar" accept="image/*" />

        <label for="bio">Biographie</label>
        <textarea id="bio" name="bio" rows="4" cols="50" placeholder="Parlez-nous de vous..."></textarea>

        <label for="recherche">Recherche (datalist)</label>
        <input type="text" id="recherche" name="recherche" list="suggestions" />
        <datalist id="suggestions">
            <option value="HTML"> </option>
            <option value="CSS"> </option>
            <option value="JavaScript"> </option>
        </datalist>

        <input type="hidden" name="token" value="abc123xyz" />
    </fieldset>

    <fieldset>
        <legend>Validation</legend>

        <input type="checkbox" id="cgu" name="cgu" required />
        <label for="cgu">J'accepte les CGU</label>

        <button type="reset">Réinitialiser</button>
        <button type="submit">Envoyer</button>
        <input type="submit" value="Envoyer (input)" />
    </fieldset>
</form>
