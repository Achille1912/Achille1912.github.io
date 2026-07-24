---
title: "Deep Learning per la segmentazione MRI 3D"
title_en: "Deep Learning for 3D MRI segmentation"
date: 2025-01-15
---

La segmentazione automatica di immagini mediche è uno dei campi più affascinanti del deep learning applicato. In questo post racconto l'approccio usato nella mia tesi magistrale.

## Il problema

Le immagini MRI 3D del seno contengono strutture anatomiche complesse da delineare manualmente. Un radiologo può impiegare ore su un singolo caso. L'obiettivo era ridurre questo tempo automatizzando il processo con una rete neurale.

## L'architettura

Ho scelto una variante della **U-Net 3D**, adattata per volumi anziché immagini 2D. La rete apprende a codificare features a diversi livelli di risoluzione spaziale e poi a decodificarle mantenendo la localizzazione precisa dei tessuti.

```python
class UNet3D(nn.Module):
    def __init__(self, in_channels=1, out_channels=2):
        super().__init__()
        self.encoder = Encoder(in_channels)
        self.decoder = Decoder(out_channels)
```

## Risultati

Il modello ha raggiunto un Dice coefficient di **0.87** sul set di test, paragonabile alle performance inter-annotatore umano su questo tipo di dataset.

## Conclusioni

La chiave del successo è stata la data augmentation aggressiva: rotazioni, elastic deformations e variazioni di intensità hanno permesso alla rete di generalizzare bene nonostante il dataset limitato.
