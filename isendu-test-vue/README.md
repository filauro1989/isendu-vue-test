# isendu-test-vue

Applicativo single page basato su dati ricevuti da API pubblica https://jsonplaceholder.typicode.com/posts.
Lo store è basato sul modulo Vuex ed ho effettuato una chiamata Axios per popolare l'array nello state.

Il progetto permette di visualizzare tutti i posts impaginati sotto forma di cards.
Ogni card possiede un button per la visualizzazione in dettaglio, uno per editare i dati tramite un modale e uno per cancellare.
E' inoltre possibile filtrare la visualizzazione tramite un modulo di ricerca testuale ricercando del testo all'interno del titolo, del post oppure incrociando i dati di entrambi.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
