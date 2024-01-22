
# Lock breaking mini-game for RAGE MP

### [Demo page](https://jjigolem.github.io/rage-lock-break/)

Сделано специально в качестве тренировки и для конкурса от [ragemp.pro](https://ragemp.pro/threads/novogodnij-konkurs-2024-razvivaem-portal-vmeste.9661/)

## Описание

Представляет собой html-проект на ванильном javascript, для внедрения в мультиплеерную платформу [RAGE MP](https://rage.mp/ru/)

Пользователю необходимо двинуть отмычку по часовой или против часовой стрелки для того, чтобы отпереть щеколду замка.
Узнать, что щеколда снята можно лишь пытаясь двинуть замочную скважину.

Учтите, при неправильно попытке наносится урон вашей отмычке. Если прочность отмычки закончится, она сломается

## Управление

1.  **Поворачивать отмычку:** для этого используйте движение `мыши` влево и вправо.

2.  **Поворачивать замочную скважину:** на клавиши `A / D` [против часовой / по часовой стрелки]

3.  **Отмена:** на клавишу `ESC`

## Взаимодействие с событиями

## Отобразить интерфейс

Событие: `Client:LockBreak:Open`

### Пример:

```js
// Client -> Client
mp.events.call("Client:LockBreak:Open");

// Server -> Client
player.call("Client:LockBreak:Open");
```

## Закрыть интерфейс

Событие: `Client:LockBreak:Canceled`

### Пример:

```js
// Client -> Client
mp.events.call("Client:LockBreak:Canceled");

// Server -> Client
player.call("Client:LockBreak:Canceled");
```

## Создать новуб отмычку (если предыдущая сломалась)

Событие: `Client:LockBreak:CreateLockpick`

### Пример:

```js
// Client -> Client
mp.events.call("Client:LockBreak:CreateLockpick");

// Server -> Client
player.call("Client:LockBreak:CreateLockpick");
```

## Вызывается, когда замок открыт

Событие: `Client:LockBreak:KeyholeLockOpened`

### Пример:

```js
// CEF -> Client
mp.events.add("Client:LockBreak:KeyholeLockOpened", () => {
  mp.gui.chat.push("Lock opened"); // Replace it with your code
})
```

## Вызывается, когда отмычка ломается

Событие: `Client:LockBreak:LockpickBroken`

### Пример:

```js
// CEF -> Client
mp.events.add("Client:LockBreak:LockpickBroken", () => {
  mp.gui.chat.push("Lockpick broken"); // Replace it with your code
})
```

## Лицензия

Этот проект лицензирован в соответствии с лицензией Apache-2.0 - подробности см. в файле [LICENSE](LICENSE).

## Автор
- [JJiGolem](https://ragemp.pro/members/jjigolem.597/)

Дизайн взят с ресурса [ragemp.pro](https://ragemp.pro/threads/gotovyj-dizajn-dlja-mini-igr-figma-vzlom-zamka-mashiny-soedinenie-provoda.7765/#post-79423)
