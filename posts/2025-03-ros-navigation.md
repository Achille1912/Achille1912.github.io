---
title: Navigazione autonoma con ROS1 e Turtlebot
date: 2025-03-08
---

# Navigazione autonoma con ROS1 e Turtlebot

ROS (Robot Operating System) è il framework standard per la robotica moderna. In questo post descrivo come ho implementato un sistema di controllo autonomo per Turtlebot.

## Architettura del sistema

Il sistema è composto da tre nodi principali:

- **Perception node**: elabora i dati del lidar e costruisce una mappa dell'ambiente
- **Planning node**: calcola il percorso ottimale verso il goal
- **Control node**: traduce il percorso in comandi di velocità

## Il nodo di controllo

```cpp
void ControlNode::cmdVelCallback(const geometry_msgs::Twist& msg) {
    double linear  = msg.linear.x;
    double angular = msg.angular.z;
    sendToMotors(linear, angular);
}
```

## Sfide incontrate

Il problema più interessante è stato gestire gli **ostacoli dinamici**: persone o oggetti che si muovono nell'ambiente. Ho implementato un replanning locale basato su Dynamic Window Approach (DWA).

## Lezioni apprese

Lavorare con hardware reale insegna umiltà: i modelli perfetti in simulazione spesso falliscono per piccole imprecisioni nei sensori fisici. La robustezza al rumore è fondamentale quanto l'algoritmo stesso.
