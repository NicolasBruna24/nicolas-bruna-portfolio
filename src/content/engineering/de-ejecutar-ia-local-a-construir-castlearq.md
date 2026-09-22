---
title: De ejecutar IA local a construir CastleArq
---

Cuando empecé a experimentar con IA local, mi objetivo era bastante simple: quería poder ejecutar modelos en mi propio computador.

Lo que encontré fue algo bastante menos simple.

Dependiendo del hardware, del sistema operativo, del modelo y del runtime utilizado, había que considerar diferentes herramientas, backends, configuraciones y compatibilidades. Para alguien que quiere simplemente ejecutar un modelo, terminar dedicando horas a descubrir qué combinación utilizar puede convertirse rápidamente en parte importante del problema.

Eso me hizo pensar en algo que parece bastante obvio:

> El usuario no debería tener que pasarse horas escogiendo las herramientas necesarias para ejecutar algo que debería ser relativamente sencillo.

De esa idea comenzó LocalAI Hub, que posteriormente evolucionaría hasta convertirse en [CastleArq](https://github.com/NicolasBruna24/CastleArq).

## El problema no era solamente ejecutar un modelo

Mi experiencia anterior había estado principalmente en Windows, donde muchas herramientas que utilizaba tenían una interfaz gráfica que escondía buena parte de la complejidad interna.

Cuando empecé a trabajar con IA local, la situación era diferente.

Podía encontrar herramientas como Ollama, llama.cpp, llama.app o LM Studio, además de diferentes tecnologías de aceleración y backends como Vulkan. También había que considerar las particularidades del hardware disponible.

El problema que empecé a percibir no era necesariamente que cada herramienta estuviera mal diseñada.

Era que el ecosistema completo podía resultar difícil de navegar.

Había varias preguntas que un usuario tenía que resolver antes incluso de llegar a utilizar un modelo:

* ¿Qué hardware tengo realmente?
* ¿Qué GPU está disponible?
* ¿Cuánta memoria puedo utilizar?
* ¿Qué runtimes están disponibles?
* ¿Qué backends están disponibles?
* ¿Qué modelos son razonables para este entorno?
* ¿Cómo consigo el modelo?
* ¿Cómo sé si realmente puedo ejecutarlo?
* ¿Qué runtime debería utilizar?

La idea inicial de LocalAI Hub surgió intentando reducir precisamente esa fricción.

## LocalAI Hub: empezar por los cimientos

El primer commit del proyecto es [`f762dbb`](https://github.com/NicolasBruna24/CastleArq/commit/f762dbb), del 11 de septiembre de 2026.

En ese momento el proyecto se llamaba LocalAI Hub.

La primera versión era mucho más pequeña que el sistema actual. Su objetivo era detectar el entorno donde se ejecutaría la IA.

El proyecto comenzaba identificando elementos como:

* sistema operativo;
* arquitectura;
* CPU;
* memoria RAM;
* GPU;
* VRAM cuando estaba disponible;
* runtimes locales;
* backends potencialmente disponibles.

También intentaba manejar correctamente situaciones donde determinada información no podía obtenerse, utilizando estados como `Unknown` o `Not detected` en lugar de asumir información que no podía comprobar.

Esto era importante porque la primera capa del problema era precisamente conocer el entorno.

Antes de decidir qué modelo ejecutar, había que saber sobre qué infraestructura se estaba tomando esa decisión.

## De detectar a decidir

El proyecto rápidamente dejó de ser solamente un detector.

El siguiente paso importante fue introducir un catálogo de modelos y un motor de compatibilidad.

El cambio conceptual era importante:

```text
¿Qué tengo?
     ↓
¿Qué puedo ejecutar?
```

Ya no bastaba con detectar hardware y software.

Había que relacionar esa información con las características de los modelos.

El sistema comenzó a trabajar con categorías de compatibilidad como:

* compatible;
* marginal;
* incompatible;
* desconocido.

También incorporó estimaciones de memoria para ayudar a tomar estas decisiones.

Esto convirtió al proyecto en algo más cercano a un motor de decisión que a una simple herramienta de diagnóstico.

## De los modelos a los artifacts

El siguiente problema era conseguir los modelos.

El proyecto incorporó descubrimiento de metadata de modelos GGUF desde Hugging Face y posteriormente una capa de gestión de artifacts.

Aquí aparecieron problemas que inicialmente ni siquiera formaban parte de la idea original:

* planificación de descargas;
* descargas parciales;
* recuperación mediante HTTP Range;
* verificación SHA-256;
* publicación atómica;
* recuperación de estados;
* limpieza de artifacts incompletos.

Esto fue otra lección importante.

Una aplicación que quiere simplificar el uso de IA local no puede asumir que el modelo simplemente "aparece" en el computador.

También necesita gestionar de manera confiable el camino entre:

```text
modelo remoto
      ↓
metadata
      ↓
descarga
      ↓
verificación
      ↓
artifact local
```

## Finalmente: ejecutar

Después de poder detectar el entorno, evaluar modelos y gestionar artifacts, apareció la siguiente pregunta:

¿Cómo ejecutamos realmente el modelo?

El proyecto comenzó a incorporar una capa de ejecución con runners, selección y resolución de artifacts, y un preflight: verificaciones previas que comprueban que la configuración es viable antes de intentar ejecutar el modelo.

El comando `run` terminó conectando estas piezas.

La arquitectura comenzaba a parecerse más a:

```text
Usuario
   ↓
CLI
   ↓
Resolución del modelo
   ↓
Preflight
   ↓
Selección de runtime
   ↓
Runner
   ↓
Modelo local
```

La detección inicial de hardware ya no era una característica aislada.

Había comenzado a convertirse en una de las primeras piezas de una cadena mucho más grande.

## El nacimiento de CastleArq

El 14 de septiembre de 2026 ocurrió uno de los cambios más importantes de la historia del proyecto.

El commit [`2e03d85`](https://github.com/NicolasBruna24/CastleArq/commit/2e03d85) se tituló:

`feat: add chat sessions and rename project to CastleArq`

En ese commit se produjo oficialmente el cambio de identidad de:

LocalAI Hub → CastleArq

El cambio incluyó, entre otras cosas:

* `localai-hub` → `castlearq` en `pyproject.toml`;
* cambio del almacenamiento local;
* actualización completa del README;
* nueva identidad del proyecto;
* licencia Apache-2.0;
* incorporación de sesiones de chat;
* expansión de la API local.

El nombre CastleArq nació de una idea bastante sencilla.

"Castle" representa una estructura grande y sólida, mientras que "Arq" viene de arquitectura.

No pretendía ser una descripción técnica precisa de una funcionalidad concreta. Era una forma de darle al proyecto la personalidad de algo que quería construir como una estructura grande y sólida.

Y, de alguna manera, terminó describiendo bastante bien la forma en que estaba evolucionando.

## La arquitectura antes que la interfaz

Una de las decisiones que puede parecer extraña mirando el proyecto desde fuera es que mi motivación inicial estaba relacionada con una GUI, pero CastleArq comenzó construyéndose principalmente como infraestructura y CLI.

Para mí tiene sentido porque la interfaz no era el problema que necesitaba resolver primero.

Antes de construir una GUI que simplificara el uso de IA local, necesitaba construir el sistema que estaría detrás de ella.

La idea era crear una base capaz de encargarse de cosas como:

```text
Hardware
   ↓
Runtime / Backend
   ↓
Compatibilidad
   ↓
Modelos
   ↓
Artifacts
   ↓
Preflight
   ↓
Ejecución
```

La interfaz podría venir después.

Primero había que construir los cimientos.

## De ejecución a diagnóstico

Después de la etapa inicial de ejecución, CastleArq continuó creciendo hacia otras áreas.

Aparecieron capacidades relacionadas con:

* detección de software de GPU;
* diagnóstico;
* recipes de configuración;
* remediation declarativa;
* verificación;
* detección del entorno de plataforma;
* knowledge;
* evaluación;
* observación del entorno.

Esto cambió nuevamente la pregunta.

Ya no se trataba solamente de:

> ¿Puedo ejecutar este modelo?

También empezaba a importar:

> ¿Qué sabe el sistema sobre este entorno y cómo puede utilizar ese conocimiento para tomar mejores decisiones?

La arquitectura comenzó a incorporar una relación más explícita entre observación, conocimiento y evaluación.

## No está terminado

Es importante aclarar algo sobre el estado actual.

CastleArq no es todavía la plataforma completa que imagino.

Actualmente estoy construyendo y consolidando su arquitectura base.

El proyecto ya contiene piezas relacionadas con detección, compatibilidad, gestión de modelos, ejecución, API, chat, diagnóstico y conocimiento, pero todavía queda mucho por construir antes de llegar a la visión final.

No quiero presentar funcionalidades futuras como si ya existieran.

La arquitectura actual es, sobre todo, la base sobre la que quiero seguir construyendo.

## Hacia dónde quiero llevarlo

Mi objetivo a largo plazo es convertir CastleArq en una plataforma open source enfocada en infraestructura y workloads de IA.

Me interesa especialmente que pueda evolucionar hacia áreas como:

* ejecución y gestión de IA local;
* fine-tuning;
* gestión de modelos y experimentos;
* evaluación;
* utilización de múltiples GPUs;
* clusters de GPU;
* orquestación de workloads de IA;
* interfaces gráficas que escondan la complejidad innecesaria.

La idea central sigue siendo la misma que estaba detrás del proyecto inicial:

**reducir la cantidad de conocimiento de infraestructura que una persona necesita dominar para poder utilizar IA.**

La diferencia es que ahora la escala de lo que quiero construir es mucho mayor.

## Lo que aprendí construyéndolo

Una de las cosas más interesantes de este proyecto ha sido descubrir que "ejecutar un modelo" es solamente la última parte de un problema mucho mayor.

Entre el usuario y la inferencia existen muchas capas:

```text
Usuario
   ↓
Interfaz
   ↓
Decisión
   ↓
Entorno
   ↓
Hardware
   ↓
Backend
   ↓
Runtime
   ↓
Modelo
   ↓
Artifact
   ↓
Ejecución
```

Si cualquiera de esas capas está mal resuelta, la experiencia completa puede degradarse.

Por eso CastleArq terminó evolucionando desde una herramienta de detección hacia una arquitectura mucho más amplia.

También aprendí que construir primero una base sólida puede ser más importante que construir inmediatamente la interfaz que el usuario termina viendo.

La GUI sigue siendo parte de la visión.

Pero antes de construirla, necesito asegurarme de que debajo exista una arquitectura capaz de sostenerla.

## El proyecto todavía está en construcción

CastleArq comenzó como una respuesta a una frustración bastante concreta: la dificultad de navegar el ecosistema de IA local.

Tres días después de su primer commit, LocalAI Hub ya había evolucionado hasta convertirse en CastleArq.

Desde entonces, la arquitectura ha seguido creciendo.

Todavía no sé exactamente hasta dónde llegará el proyecto.

Pero sí tengo bastante claro el principio que quiero conservar:

> La infraestructura debería hacer el trabajo complejo para que el usuario pueda concentrarse en utilizar la IA.

Ese sigue siendo el problema que quiero resolver.

Y CastleArq todavía está construyendo sus cimientos.