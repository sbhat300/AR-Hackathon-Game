// ============================================================================
// GOLD MINE ROYALE 3D - v11 (PROPER UI DETECTION)
// ============================================================================
// - Uses ScreenTransform.containsScreenPoint() for proper UI hit testing
// - Drag-to-spawn mechanic
// - Gold economy tied to mine buildings
// - Card cycling system
// ============================================================================

// === BUILDINGS ===
//@input SceneObject playerKingTower {"label":"Player King Tower"}
//@input SceneObject enemyKingTower {"label":"Enemy King Tower"}
//@input SceneObject playerLeftMine {"label":"Player Left Mine"}
//@input SceneObject playerRightMine {"label":"Player Right Mine"}
//@input SceneObject enemyLeftMine {"label":"Enemy Left Mine"}
//@input SceneObject enemyRightMine {"label":"Enemy Right Mine"}

// === GROUND PLANE ===
// @ui {"widget":"group_start", "label":"Ground Setup"}
//@input SceneObject groundPlane {"label":"Ground Plane"}
//@input Component.Camera gameCamera {"label":"Game Camera"}
// @ui {"widget":"group_end"}

// === CURSOR / PREVIEW ===
// @ui {"widget":"group_start", "label":"Cursor & Preview"}
//@input SceneObject cursorBox {"label":"Cursor Box"}
//@input SceneObject spawnPreviewGhost {"label":"Spawn Preview Ghost"}
//@input bool showCursor = true {"label":"Show Cursor"}
// @ui {"widget":"group_end"}

// === TEMPLATES ===
// @ui {"widget":"group_start", "label":"Troop Templates"}
//@input SceneObject templateMeleePlayer {"label":"Melee Player Template"}
//@input SceneObject templateMeleeEnemy {"label":"Melee Enemy Template"}
//@input SceneObject templateArcherPlayer {"label":"Archer Player Template"}
//@input SceneObject templateArcherEnemy {"label":"Archer Enemy Template"}
//@input SceneObject templateTankPlayer {"label":"Tank Player Template"}
//@input SceneObject templateTankEnemy {"label":"Tank Enemy Template"}
//@input SceneObject templateSpeedPlayer {"label":"Speed Player Template"}
//@input SceneObject templateSpeedEnemy {"label":"Speed Enemy Template"}
//@input SceneObject templateLaser {"label":"Laser Template"}
// @ui {"widget":"group_end"}

//@input SceneObject troopContainer {"label":"Troop Container"}

// === UI - CARD SLOTS (SceneObjects with ScreenTransform) ===
// @ui {"widget":"group_start", "label":"UI - Card Slot Objects"}
//@input SceneObject cardSlot1 {"label":"Card Slot 1"}
//@input SceneObject cardSlot2 {"label":"Card Slot 2"}
//@input SceneObject cardSlot3 {"label":"Card Slot 3"}
//@input SceneObject cardSlot4 {"label":"Card Slot 4"}
//@input SceneObject nextCardSlot {"label":"Next Card Slot"}
// @ui {"widget":"group_end"}

// @ui {"widget":"group_start", "label":"UI - Card Cost Text"}
//@input Component.Text cardCost1 {"label":"Card 1 Cost Text"}
//@input Component.Text cardCost2 {"label":"Card 2 Cost Text"}
//@input Component.Text cardCost3 {"label":"Card 3 Cost Text"}
//@input Component.Text cardCost4 {"label":"Card 4 Cost Text"}
// @ui {"widget":"group_end"}

// @ui {"widget":"group_start", "label":"UI - Gold Display"}
//@input Component.Text goldText {"label":"Gold Amount Text"}
// @ui {"widget":"group_end"}

// @ui {"widget":"group_start", "label":"UI - Card Textures"}
//@input Asset.Texture texMelee {"label":"Melee Card Texture"}
//@input Asset.Texture texArcher {"label":"Archer Card Texture"}
//@input Asset.Texture texTank {"label":"Tank Card Texture"}
//@input Asset.Texture texSpeed {"label":"Speed Card Texture"}
// @ui {"widget":"group_end"}

// @ui {"widget":"group_start", "label":"UI - Selection Highlight"}
//@input SceneObject cardHighlight {"label":"Card Selection Highlight"}
// @ui {"widget":"group_end"}

// === RANGES ===
// @ui {"widget":"group_start", "label":"Attack Ranges"}
//@input float meleeRange = 1.5 {"label":"Melee Attack Range", "min":0.1, "max":10.0, "step":0.1}
//@input float archerRange = 5.0 {"label":"Archer Attack Range", "min":0.5, "max":20.0, "step":0.5}
// @ui {"widget":"group_end"}

// === COLLISION ===
// @ui {"widget":"group_start", "label":"Collision Radius"}
//@input float meleeCollisionRadius = 0.8 {"label":"Melee Collision", "min":0.1, "max":5.0, "step":0.1}
//@input float archerCollisionRadius = 0.6 {"label":"Archer Collision", "min":0.1, "max":5.0, "step":0.1}
// @ui {"widget":"group_end"}

// === ECONOMY SETTINGS ===
// @ui {"widget":"group_start", "label":"Economy"}
//@input int startingGold = 5 {"label":"Starting Gold", "min":0, "max":20}
//@input int maxGold = 10 {"label":"Max Gold", "min":5, "max":20}
//@input float passiveGoldRate = 0.5 {"label":"Passive Gold/sec", "min":0.1, "max":2.0, "step":0.1}
//@input float mineGoldRate = 0.3 {"label":"Mine Bonus Gold/sec", "min":0.1, "max":1.0, "step":0.1}
// @ui {"widget":"group_end"}

// === OTHER ===
// @ui {"widget":"group_start", "label":"Other Settings"}
//@input float troopSizeMultiplier = 0.5 {"label":"Base Troop Size", "min":0.1, "max":3.0, "step":0.1}
//@input float meleeSizeMultiplier = 1.0 {"label":"Melee Size", "min":0.1, "max":3.0, "step":0.1}
//@input float archerSizeMultiplier = 1.0 {"label":"Archer Size", "min":0.1, "max":3.0, "step":0.1}
//@input float tankSizeMultiplier = 1.5 {"label":"Tank Size", "min":0.1, "max":3.0, "step":0.1}
//@input float speedSizeMultiplier = 0.8 {"label":"Speed Size", "min":0.1, "max":3.0, "step":0.1}
//@input float moveSpeedMultiplier = 1.0 {"label":"Move Speed", "min":0.1, "max":3.0, "step":0.1}
//@input float laserDuration = 0.15 {"label":"Laser Duration", "min":0.05, "max":0.5, "step":0.01}
// @ui {"widget":"group_end"}

// ============================================================================
// TROOP DEFINITIONS
// ============================================================================

var TROOPS = {
    MELEE:  { name: 'Melee',  hp: 500, dmg: 60,  speed: 1.0, atkSpd: 1.0, cost: 3, isRanged: false },
    ARCHER: { name: 'Archer', hp: 250, dmg: 40,  speed: 0.8, atkSpd: 1.2, cost: 3, isRanged: true },
    TANK:   { name: 'Tank',   hp: 1200, dmg: 80, speed: 0.5, atkSpd: 1.5, cost: 5, isRanged: false },
    SPEED:  { name: 'Speed',  hp: 200, dmg: 45,  speed: 1.8, atkSpd: 0.8, cost: 2, isRanged: false }
};

var TROOP_TYPES = ['MELEE', 'ARCHER', 'TANK', 'SPEED'];

// ============================================================================
// CONFIG
// ============================================================================

var ARENA = {
    minX: 0, maxX: 0,
    minZ: 0, maxZ: 0,
    groundY: 0,
    centerZ: 0,
    width: 0, depth: 0,
    playerAtMin: true,
    buildingScale: 1
};

var COMBAT = {
    meleeRange: 1.5,
    archerRange: 5.0,
    meleeCollision: 0.8,
    archerCollision: 0.6,
    baseSpeed: 3.0,
    troopScale: 1
};

var GAME = {
    kingHP: 2500,
    mineHP: 400,
    mineRespawn: 5.0,
    botInterval: 2.5,
    botMaxTroops: 6
};

// ============================================================================
// STATE
// ============================================================================

var state = {
    running: false,
    buildings: [],
    troops: [],
    lasers: [],
    currentTouchPos: null,
    isTouching: false,
    
    // Deck system
    playerDeck: [],
    handCards: [],
    nextCard: null,
    deckIndex: 0,
    
    // Drag system
    selectedCardIndex: -1,
    isDragging: false,
    dragVisual: null, // <--- ADD THIS LINE
    
    // Gold system
    gold: 5,
    goldAccumulator: 0,
    enemyGold: 5,
    enemyGoldAccumulator: 0
};

var botTimer = 2.5;

// Cache for ScreenTransforms
var cardScreenTransforms = [];

// ============================================================================
// UTILITIES
// ============================================================================

// ============================================================================
// DRAG VISUAL (DANGLING 3D MODEL)
// ============================================================================

function updateDragVisual(worldPos) {
    if (state.selectedCardIndex < 0 || !state.isDragging) return;

    if (!state.dragVisual) {
        var troopType = state.handCards[state.selectedCardIndex];
        
        var template = null;
        if (troopType === 'MELEE') template = script.templateMeleePlayer;
        else if (troopType === 'ARCHER') template = script.templateArcherPlayer;
        else if (troopType === 'TANK') template = script.templateTankPlayer;
        else if (troopType === 'SPEED') template = script.templateSpeedPlayer;

        if (template) {
            var scale = getTroopScale(troopType);  // Use type-specific scale
            state.dragVisual = cloneTemplate(
                template, 
                "DragVisual", 
                script.troopContainer, 
                worldPos, 
                scale
            );
        }
    }

    if (state.dragVisual) {
        var t = state.dragVisual.getTransform();
        t.setWorldPosition(new vec3(worldPos.x, worldPos.y + 1.0, worldPos.z));
    }
}

function dist2D(a, b) {
    var dx = a.x - b.x;
    var dz = a.z - b.z;
    return Math.sqrt(dx * dx + dz * dz);
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function getWorldPos(obj) {
    if (!obj) return null;
    var p = obj.getTransform().getWorldPosition();
    return { x: p.x, y: p.y, z: p.z };
}

function getWorldScale(obj) {
    if (!obj) return null;
    var s = obj.getTransform().getWorldScale();
    return { x: s.x, y: s.y, z: s.z };
}

function getTroopScale(troopType) {
    var baseScale = COMBAT.troopScale;
    switch (troopType) {
        case 'MELEE':  return baseScale * (script.meleeSizeMultiplier || 1.0);
        case 'ARCHER': return baseScale * (script.archerSizeMultiplier || 1.0);
        case 'TANK':   return baseScale * (script.tankSizeMultiplier || 1.5);
        case 'SPEED':  return baseScale * (script.speedSizeMultiplier || 0.8);
        default:       return baseScale;
    }
}

function screenToWorld(touchPos) {
    var worldX = ARENA.minX + touchPos.x * ARENA.width;
    var worldZ = ARENA.maxZ + touchPos.y * ARENA.depth - 18;
    return { x: worldX, y: ARENA.groundY, z: worldZ };
}

function shuffleArray(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

// ============================================================================
// UI HIT TESTING - PROPER LENS STUDIO METHOD
// ============================================================================

function initCardScreenTransforms() {
    cardScreenTransforms = [];
    
    var slots = [script.cardSlot1, script.cardSlot2, script.cardSlot3, script.cardSlot4];
    
    for (var i = 0; i < slots.length; i++) {
        if (slots[i]) {
            var st = slots[i].getComponent('Component.ScreenTransform');
            if (st) {
                cardScreenTransforms.push(st);
                print('Card ' + (i+1) + ' ScreenTransform found');
            } else {
                cardScreenTransforms.push(null);
                print('WARNING: Card ' + (i+1) + ' has no ScreenTransform!');
            }
        } else {
            cardScreenTransforms.push(null);
            print('WARNING: Card slot ' + (i+1) + ' not assigned!');
        }
    }
}

// Check which card slot contains the screen point
// Returns card index (0-3) or -1 if no card hit
function getCardAtScreenPoint(screenPos) {
    // Convert to vec2 for containsScreenPoint
    var touchVec = new vec2(screenPos.x, screenPos.y);
    
    // FIX: Iterate BACKWARDS (3 down to 0). 
    // In UI, later elements (higher indices) are usually rendered on top.
    // This prevents Card 1 from "stealing" clicks meant for overlapping cards.
    for (var i = cardScreenTransforms.length - 1; i >= 0; i--) {
        var st = cardScreenTransforms[i];
        if (st && st.containsScreenPoint(touchVec)) {
            return i;
        }
    }
    
    return -1;
}
// Check if touch is on ANY card
function isOnAnyCard(screenPos) {
    return getCardAtScreenPoint(screenPos) >= 0;
}

// ============================================================================
// DECK SYSTEM
// ============================================================================

function initializeDeck() {
    state.playerDeck = [];
    for (var i = 0; i < TROOP_TYPES.length; i++) {
        state.playerDeck.push(TROOP_TYPES[i]);
        state.playerDeck.push(TROOP_TYPES[i]);
    }
    
    state.playerDeck = shuffleArray(state.playerDeck);
    
    state.handCards = [];
    state.deckIndex = 0;
    
    for (var j = 0; j < 4; j++) {
        state.handCards.push(state.playerDeck[state.deckIndex]);
        state.deckIndex++;
    }
    
    state.nextCard = state.playerDeck[state.deckIndex];
    
    print('Deck initialized: ' + state.handCards.join(', ') + ' | Next: ' + state.nextCard);
}

function drawNextCard(slotIndex) {
    state.handCards[slotIndex] = state.nextCard;
    
    state.deckIndex++;
    if (state.deckIndex >= state.playerDeck.length) {
        state.deckIndex = 0;
        state.playerDeck = shuffleArray(state.playerDeck);
    }
    
    state.nextCard = state.playerDeck[state.deckIndex];
    
    updateCardUI();
}

function getCardTexture(troopType) {
    switch (troopType) {
        case 'MELEE': return script.texMelee;
        case 'ARCHER': return script.texArcher;
        case 'TANK': return script.texTank;
        case 'SPEED': return script.texSpeed;
        default: return null;
    }
}

function updateCardUI() {
    var slots = [script.cardSlot1, script.cardSlot2, script.cardSlot3, script.cardSlot4];
    var costTexts = [script.cardCost1, script.cardCost2, script.cardCost3, script.cardCost4];
    
    for (var i = 0; i < 4; i++) {
        var troopType = state.handCards[i];
        var troopDef = TROOPS[troopType];
        var canAfford = state.gold >= troopDef.cost;
        
        if (slots[i]) {
            var img = slots[i].getComponent('Component.Image');
            if (img) {
                var tex = getCardTexture(troopType);
                if (tex && img.mainPass) {
                    img.mainPass.baseTex = tex;
                }
                
                // Gray out if can't afford
                if (img.mainPass) {
                    if (canAfford) {
                        img.mainPass.baseColor = new vec4(1, 1, 1, 1);
                    } else {
                        img.mainPass.baseColor = new vec4(0.4, 0.4, 0.4, 1);
                    }
                }
            }
        }
        
        if (costTexts[i]) {
            costTexts[i].text = troopDef.cost.toString();
        }
    }
    
    // Next card preview
    if (script.nextCardSlot && state.nextCard) {
        var nextImg = script.nextCardSlot.getComponent('Component.Image');
        if (nextImg) {
            var nextTex = getCardTexture(state.nextCard);
            if (nextTex && nextImg.mainPass) {
                nextImg.mainPass.baseTex = nextTex;
            }
        }
    }
    
    updateCardHighlight();
}

function updateGoldUI() {
    if (script.goldText) {
        script.goldText.text = Math.floor(state.gold).toString();
    }
}

// ============================================================================
// CARD HIGHLIGHT
// ============================================================================

function updateCardHighlight() {
    if (!script.cardHighlight) return;
    
    if (state.selectedCardIndex < 0 || state.selectedCardIndex >= cardScreenTransforms.length) {
        script.cardHighlight.enabled = false;
        return;
    }
    
    var selectedST = cardScreenTransforms[state.selectedCardIndex];
    if (!selectedST) {
        script.cardHighlight.enabled = false;
        return;
    }
    
    script.cardHighlight.enabled = true;
    
    // Position highlight at selected card
    var highlightST = script.cardHighlight.getComponent('Component.ScreenTransform');
    if (highlightST) {
        highlightST.anchors = selectedST.anchors;
    }
}

// ============================================================================
// GOLD ECONOMY
// ============================================================================

function updateGold(dt) {
    var passiveRate = script.passiveGoldRate || 0.5;
    var mineRate = script.mineGoldRate || 0.3;
    var maxGold = script.maxGold || 10;
    
    var playerMineCount = 0;
    var enemyMineCount = 0;
    
    for (var i = 0; i < state.buildings.length; i++) {
        var b = state.buildings[i];
        if (b.type === 'mine' && b.active) {
            if (b.owner === 'player') playerMineCount++;
            else enemyMineCount++;
        }
    }
    
    // Player gold
    var playerGoldRate = passiveRate + (playerMineCount * mineRate);
    state.goldAccumulator += playerGoldRate * dt;
    
    if (state.goldAccumulator >= 1.0) {
        var goldToAdd = Math.floor(state.goldAccumulator);
        state.gold = Math.min(maxGold, state.gold + goldToAdd);
        state.goldAccumulator -= goldToAdd;
        updateGoldUI();
        updateCardUI();
    }
    
    // Enemy gold
    var enemyGoldRate = passiveRate + (enemyMineCount * mineRate);
    state.enemyGoldAccumulator += enemyGoldRate * dt;
    
    if (state.enemyGoldAccumulator >= 1.0) {
        var enemyGoldToAdd = Math.floor(state.enemyGoldAccumulator);
        state.enemyGold = Math.min(maxGold, state.enemyGold + enemyGoldToAdd);
        state.enemyGoldAccumulator -= enemyGoldToAdd;
    }
}

function spendGold(amount) {
    if (state.gold >= amount) {
        state.gold -= amount;
        updateGoldUI();
        updateCardUI();
        return true;
    }
    return false;
}

function enemySpendGold(amount) {
    if (state.enemyGold >= amount) {
        state.enemyGold -= amount;
        return true;
    }
    return false;
}

// ============================================================================
// CARD SELECTION
// ============================================================================

function trySelectCard(cardIndex) {
    if (cardIndex < 0 || cardIndex >= 4) {
        return false;
    }
    
    var troopType = state.handCards[cardIndex];
    var troopDef = TROOPS[troopType];
    
    if (state.gold < troopDef.cost) {
        print('Not enough gold for ' + troopType + '! Need ' + troopDef.cost + ', have ' + Math.floor(state.gold));
        return false;
    }
    
    state.selectedCardIndex = cardIndex;
    print('>>> SELECTED: Card ' + (cardIndex + 1) + ' = ' + troopType + ' (Cost: ' + troopDef.cost + ')');
    
    updateCardHighlight();
    return true;
}

function clearSelection() {
    state.selectedCardIndex = -1;
    state.isDragging = false;
    
    // DESTROY DRAG VISUAL
    if (state.dragVisual) {
        state.dragVisual.destroy();
        state.dragVisual = null;
    }
    
    if (script.cardHighlight) {
        script.cardHighlight.enabled = false;
    }
    
    if (script.spawnPreviewGhost) {
        script.spawnPreviewGhost.enabled = false;
    }
}

// ============================================================================
// SPAWN PREVIEW
// ============================================================================

function updateSpawnPreview(worldPos, isValid) {
    if (!script.spawnPreviewGhost) return;
    
    if (state.selectedCardIndex >= 0 && state.isDragging) {
        script.spawnPreviewGhost.enabled = true;
        script.spawnPreviewGhost.getTransform().setWorldPosition(
            new vec3(worldPos.x, worldPos.y + 0.5, worldPos.z)
        );
        
        var visual = script.spawnPreviewGhost.getComponent('Component.RenderMeshVisual');
        if (visual && visual.mainPass) {
            if (isValid) {
                visual.mainPass.baseColor = new vec4(0, 1, 0, 0.5);
            } else {
                visual.mainPass.baseColor = new vec4(1, 0, 0, 0.5);
            }
        }
    } else {
        script.spawnPreviewGhost.enabled = false;
    }
}

// ============================================================================
// CURSOR
// ============================================================================

function updateCursor() {
    if (!script.cursorBox) return;
    
    if (!script.showCursor || !state.currentTouchPos) {
        script.cursorBox.enabled = false;
        return;
    }
    
    var world = screenToWorld(state.currentTouchPos);
    
    script.cursorBox.enabled = true;
    script.cursorBox.getTransform().setWorldPosition(
        new vec3(world.x, world.y + 0.1, world.z)
    );
}

// ============================================================================
// CLONE TEMPLATE
// ============================================================================

function cloneTemplate(template, name, parent, position, scale) {
    if (!template) return null;
    
    var obj = global.scene.createSceneObject(name);
    if (parent) obj.setParent(parent);
    
    var templateVisual = template.getComponent('Component.RenderMeshVisual');
    if (!templateVisual) return null;
    
    var meshVisual = obj.createComponent('Component.RenderMeshVisual');
    meshVisual.mesh = templateVisual.mesh;
    meshVisual.mainMaterial = templateVisual.mainMaterial;
    
    var t = obj.getTransform();
    t.setWorldPosition(new vec3(position.x, position.y, position.z));
    t.setWorldScale(new vec3(scale, scale, scale));
    
    return obj;
}

// ============================================================================
// CALIBRATION
// ============================================================================

function calibrate() {
    print('');
    print('=== CALIBRATING v11 ===');
    
    // Hide templates
    if (script.templateMeleePlayer) script.templateMeleePlayer.enabled = false;
    if (script.templateMeleeEnemy) script.templateMeleeEnemy.enabled = false;
    if (script.templateArcherPlayer) script.templateArcherPlayer.enabled = false;
    if (script.templateArcherEnemy) script.templateArcherEnemy.enabled = false;
    if (script.templateTankPlayer) script.templateTankPlayer.enabled = false;
    if (script.templateTankEnemy) script.templateTankEnemy.enabled = false;
    if (script.templateSpeedPlayer) script.templateSpeedPlayer.enabled = false;
    if (script.templateSpeedEnemy) script.templateSpeedEnemy.enabled = false;
    if (script.templateLaser) script.templateLaser.enabled = false;
    if (script.spawnPreviewGhost) script.spawnPreviewGhost.enabled = false;
    if (script.cardHighlight) script.cardHighlight.enabled = false;
    
    // Initialize card ScreenTransforms cache
    initCardScreenTransforms();
    
    // Ground plane
    if (script.groundPlane) {
        var gp = getWorldPos(script.groundPlane);
        ARENA.groundY = gp.y;
    }
    
    var objs = [
        { obj: script.playerKingTower, owner: 'player' },
        { obj: script.enemyKingTower, owner: 'enemy' },
        { obj: script.playerLeftMine, owner: 'player' },
        { obj: script.playerRightMine, owner: 'player' },
        { obj: script.enemyLeftMine, owner: 'enemy' },
        { obj: script.enemyRightMine, owner: 'enemy' }
    ];
    
    var positions = [];
    var totalScale = 0;
    var scaleCount = 0;
    
    for (var i = 0; i < objs.length; i++) {
        var pos = getWorldPos(objs[i].obj);
        var scl = getWorldScale(objs[i].obj);
        
        if (pos) {
            positions.push({ x: pos.x, y: pos.y, z: pos.z, owner: objs[i].owner });
            if (scl) {
                totalScale += (Math.abs(scl.x) + Math.abs(scl.y) + Math.abs(scl.z)) / 3;
                scaleCount++;
            }
        }
    }
    
    if (positions.length < 4) {
        print('ERROR: Need at least 4 buildings!');
        return false;
    }
    
    ARENA.buildingScale = scaleCount > 0 ? totalScale / scaleCount : 1;
    
    var playerPos = [];
    var enemyPos = [];
    for (var j = 0; j < positions.length; j++) {
        if (positions[j].owner === 'player') playerPos.push(positions[j]);
        else enemyPos.push(positions[j]);
    }
    
    var avgPZ = 0, avgEZ = 0;
    for (var k = 0; k < playerPos.length; k++) avgPZ += playerPos[k].z;
    avgPZ /= playerPos.length;
    
    for (var l = 0; l < enemyPos.length; l++) avgEZ += enemyPos[l].z;
    avgEZ /= enemyPos.length;
    
    var minX = 999, maxX = -999, minZ = 999, maxZ = -999, sumY = 0;
    for (var m = 0; m < positions.length; m++) {
        var p = positions[m];
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.z < minZ) minZ = p.z;
        if (p.z > maxZ) maxZ = p.z;
        sumY += p.y;
    }
    
    var padX = (maxX - minX) * 0.3;
    var padZ = (maxZ - minZ) * 0.25;
    
    ARENA.minX = minX - padX;
    ARENA.maxX = maxX + padX;
    ARENA.minZ = minZ - padZ;
    ARENA.maxZ = maxZ + padZ;
    ARENA.width = ARENA.maxX - ARENA.minX;
    ARENA.depth = ARENA.maxZ - ARENA.minZ;
    ARENA.centerZ = (ARENA.minZ + ARENA.maxZ) / 2;
    
    if (!script.groundPlane) {
        ARENA.groundY = sumY / positions.length;
    }
    
    ARENA.playerAtMin = avgPZ < avgEZ;
    
    print('Arena X: ' + ARENA.minX.toFixed(2) + ' to ' + ARENA.maxX.toFixed(2));
    print('Arena Z: ' + ARENA.minZ.toFixed(2) + ' to ' + ARENA.maxZ.toFixed(2));
    print('Player at: ' + (ARENA.playerAtMin ? 'MIN Z' : 'MAX Z'));
    
    var ref = ARENA.buildingScale;
    COMBAT.troopScale = ref * (script.troopSizeMultiplier || 0.5);
    COMBAT.meleeRange = script.meleeRange || 1.5;
    COMBAT.archerRange = script.archerRange || 5.0;
    COMBAT.meleeCollision = script.meleeCollisionRadius || 0.8;
    COMBAT.archerCollision = script.archerCollisionRadius || 0.6;
    COMBAT.baseSpeed = ref * 3.0 * (script.moveSpeedMultiplier || 1.0);
    
    print('======================');
    
    return true;
}

// ============================================================================
// BUILDING
// ============================================================================

function Building(type, owner, sceneObject) {
    this.type = type;
    this.owner = owner;
    this.sceneObject = sceneObject;
    this.maxHP = type === 'king' ? GAME.kingHP : GAME.mineHP;
    this.hp = this.maxHP;
    this.active = true;
    this.alive = true;
    this.respawnTimer = 0;
    this.pos = getWorldPos(sceneObject) || { x: 0, y: 0, z: 0 };
    this.originalScale = sceneObject ? sceneObject.getTransform().getLocalScale() : new vec3(1,1,1);
}

Building.prototype.damage = function(amount) {
    if (!this.active) return false;
    this.hp = Math.max(0, this.hp - amount);
    
    if (this.hp <= 0) {
        this.active = false;
        this.alive = false;
        print('*** ' + this.owner.toUpperCase() + ' ' + this.type.toUpperCase() + ' DESTROYED ***');
        if (this.type === 'mine') this.respawnTimer = GAME.mineRespawn;
        if (this.sceneObject) {
            this.sceneObject.getTransform().setLocalScale(new vec3(0.01, 0.01, 0.01));
        }
        return true;
    }
    return false;
};

Building.prototype.update = function(dt) {
    if (this.sceneObject) this.pos = getWorldPos(this.sceneObject);
    
    if (!this.active && this.type === 'mine') {
        this.respawnTimer -= dt;
        if (this.respawnTimer <= 0) {
            this.hp = this.maxHP;
            this.active = true;
            this.alive = true;
            if (this.sceneObject) {
                this.sceneObject.getTransform().setLocalScale(this.originalScale);
            }
        }
    }
};

// ============================================================================
// LASER
// ============================================================================

function Laser(startPos, endPos) {
    this.timer = script.laserDuration || 0.15;
    this.alive = true;
    this.sceneObject = null;
    
    if (!script.templateLaser) {
        this.alive = false;
        return;
    }
    
    var dx = endPos.x - startPos.x;
    var dy = endPos.y - startPos.y;
    var dz = endPos.z - startPos.z;
    var length = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    if (length < 0.001) {
        this.alive = false;
        return;
    }
    
    this.sceneObject = cloneTemplate(
        script.templateLaser,
        'Laser',
        script.troopContainer,
        { 
            x: (startPos.x + endPos.x) / 2, 
            y: (startPos.y + endPos.y) / 2, 
            z: (startPos.z + endPos.z) / 2 
        },
        1
    );
    
    if (this.sceneObject) {
        var t = this.sceneObject.getTransform();
        var templateScale = getWorldScale(script.templateLaser);
        var thickness = templateScale ? (templateScale.x + templateScale.y) / 2 : 0.1;
        
        t.setWorldScale(new vec3(thickness, thickness, length));
        
        var rot = quat.lookAt(new vec3(dx/length, dy/length, dz/length), new vec3(0, 1, 0));
        t.setWorldRotation(rot);
    }
}

Laser.prototype.update = function(dt) {
    this.timer -= dt;
    if (this.timer <= 0) {
        this.alive = false;
        if (this.sceneObject) {
            this.sceneObject.destroy();
            this.sceneObject = null;
        }
    }
};

// ============================================================================
// TROOP
// ============================================================================

function Troop(type, owner, pos, lane) {
    var def = TROOPS[type];
    
    this.type = type;
    this.owner = owner;
    this.pos = { x: pos.x, y: pos.y, z: pos.z };
    this.lane = lane;
    
    this.name = def.name;
    this.maxHP = def.hp;
    this.hp = def.hp;
    this.dmg = def.dmg;
    this.speed = def.speed * COMBAT.baseSpeed;
    this.isRanged = def.isRanged;
    this.range = this.isRanged ? COMBAT.archerRange : COMBAT.meleeRange;
    this.collisionRadius = this.isRanged ? COMBAT.archerCollision : COMBAT.meleeCollision;
    this.atkSpd = def.atkSpd;
    this.atkCD = 0;
    
    this.target = null;
    this.alive = true;
    this.sceneObject = null;
    this.velX = 0;
    this.velZ = 0;
}

Troop.prototype.getTemplate = function() {
    var templates = {
        'MELEE': { player: script.templateMeleePlayer, enemy: script.templateMeleeEnemy },
        'ARCHER': { player: script.templateArcherPlayer, enemy: script.templateArcherEnemy },
        'TANK': { player: script.templateTankPlayer, enemy: script.templateTankEnemy },
        'SPEED': { player: script.templateSpeedPlayer, enemy: script.templateSpeedEnemy }
    };
    
    var troopTemplates = templates[this.type];
    if (troopTemplates) {
        return this.owner === 'player' ? troopTemplates.player : troopTemplates.enemy;
    }
    
    return this.owner === 'player' ? script.templateMeleePlayer : script.templateMeleeEnemy;
};

Troop.prototype.createVisual = function(parent) {
    var template = this.getTemplate();
    if (!template) return;
    
    var scale = getTroopScale(this.type);  // Use type-specific scale
    
    this.sceneObject = cloneTemplate(
        template,
        'Troop_' + this.owner + '_' + this.name,
        parent,
        this.pos,
        scale
    );
};

Troop.prototype.findTarget = function() {
    var closest = null;
    var closestDist = 999999;
    var enemyOwner = this.owner === 'player' ? 'enemy' : 'player';
    
    for (var i = 0; i < state.troops.length; i++) {
        var t = state.troops[i];
        if (t.owner === this.owner || !t.alive) continue;
        var d = dist2D(this.pos, t.pos);
        if (d < closestDist) {
            closestDist = d;
            closest = t;
        }
    }
    
    for (var j = 0; j < state.buildings.length; j++) {
        var b = state.buildings[j];
        if (b.owner !== enemyOwner || !b.active) continue;
        var d2 = dist2D(this.pos, b.pos);
        if (d2 < closestDist) {
            closestDist = d2;
            closest = b;
        }
    }
    
    this.target = closest;
};

Troop.prototype.update = function(dt) {
    if (!this.alive) return;
    
    if (this.atkCD > 0) this.atkCD -= dt;
    
    this.findTarget();
    
    if (!this.target) return;
    
    var d = dist2D(this.pos, this.target.pos);
    
    if (d <= this.range) {
        this.velX = 0;
        this.velZ = 0;
        if (this.atkCD <= 0) this.attack();
    } else {
        this.moveToward(dt);
    }
    
    this.resolveCollisions();
    
    if (this.sceneObject) {
        this.sceneObject.getTransform().setWorldPosition(
            new vec3(this.pos.x, this.pos.y, this.pos.z)
        );
    }
};

Troop.prototype.moveToward = function(dt) {
    if (!this.target) return;
    
    var dx = this.target.pos.x - this.pos.x;
    var dz = this.target.pos.z - this.pos.z;
    var dist = Math.sqrt(dx * dx + dz * dz);
    
    if (dist < 0.0001) return;
    
    var smooth = 8.0;
    this.velX = lerp(this.velX, (dx / dist) * this.speed, smooth * dt);
    this.velZ = lerp(this.velZ, (dz / dist) * this.speed, smooth * dt);
    
    this.pos.x = clamp(this.pos.x + this.velX * dt, ARENA.minX, ARENA.maxX);
    this.pos.z = clamp(this.pos.z + this.velZ * dt, ARENA.minZ, ARENA.maxZ);
};

Troop.prototype.resolveCollisions = function() {
    for (var i = 0; i < state.troops.length; i++) {
        var other = state.troops[i];
        if (other === this || !other.alive) continue;
        
        var d = dist2D(this.pos, other.pos);
        var minDist = this.collisionRadius + other.collisionRadius;
        
        if (d < minDist && d > 0.0001) {
            var pushX = this.pos.x - other.pos.x;
            var pushZ = this.pos.z - other.pos.z;
            var pushLen = Math.sqrt(pushX * pushX + pushZ * pushZ);
            
            if (pushLen > 0) {
                var overlap = minDist - d;
                this.pos.x += (pushX / pushLen) * overlap * 0.5;
                this.pos.z += (pushZ / pushLen) * overlap * 0.5;
            }
        }
    }
    
    this.pos.x = clamp(this.pos.x, ARENA.minX, ARENA.maxX);
    this.pos.z = clamp(this.pos.z, ARENA.minZ, ARENA.maxZ);
};

Troop.prototype.attack = function() {
    if (!this.target) return;
    
    if (this.target.damage) this.target.damage(this.dmg);
    else if (this.target.takeDamage) this.target.takeDamage(this.dmg);
    
    this.atkCD = this.atkSpd;
    
    var laser = new Laser(this.pos, this.target.pos);
    if (laser.alive) state.lasers.push(laser);
};

Troop.prototype.takeDamage = function(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
        this.alive = false;
        if (this.sceneObject) {
            this.sceneObject.destroy();
            this.sceneObject = null;
        }
    }
};

// ============================================================================
// SPAWN
// ============================================================================

function spawnTroop(type, owner, pos, lane) {
    var troop = new Troop(type, owner, pos, lane);
    troop.createVisual(script.troopContainer);
    state.troops.push(troop);
    print('+ SPAWNED: ' + owner + ' ' + troop.name + ' at (' + pos.x.toFixed(1) + ', ' + pos.z.toFixed(1) + ')');
    return troop;
}

function spawnFromCard(cardIndex, worldPos) {
    if (cardIndex < 0 || cardIndex >= 4) {
        print('ERROR: Invalid card index ' + cardIndex);
        return false;
    }
    
    var troopType = state.handCards[cardIndex];
    var troopDef = TROOPS[troopType];
    
    if (!spendGold(troopDef.cost)) {
        print('Cannot afford ' + troopType + ' (cost: ' + troopDef.cost + ', have: ' + Math.floor(state.gold) + ')');
        return false;
    }
    
    var thresh = ARENA.width * 0.2;
    var lane = worldPos.x < -thresh ? 'left' : worldPos.x > thresh ? 'right' : 'middle';
    
    spawnTroop(troopType, 'player', worldPos, lane);
    drawNextCard(cardIndex);
    
    return true;
}

// ============================================================================
// BOT
// ============================================================================

function updateBot(dt) {
    botTimer -= dt;
    
    if (botTimer <= 0) {
        botTimer = GAME.botInterval + rand(-0.3, 0.3);
        
        var count = 0;
        for (var i = 0; i < state.troops.length; i++) {
            if (state.troops[i].owner === 'enemy' && state.troops[i].alive) count++;
        }
        if (count >= GAME.botMaxTroops) return;
        
        var affordableTypes = [];
        for (var j = 0; j < TROOP_TYPES.length; j++) {
            var type = TROOP_TYPES[j];
            if (state.enemyGold >= TROOPS[type].cost) {
                affordableTypes.push(type);
            }
        }
        
        if (affordableTypes.length === 0) return;
        
        var chosenType = affordableTypes[Math.floor(Math.random() * affordableTypes.length)];
        var troopDef = TROOPS[chosenType];
        
        if (!enemySpendGold(troopDef.cost)) return;
        
        var r = Math.random();
        var x = r < 0.33 ? rand(ARENA.minX * 0.6, ARENA.minX * 0.1) :
                r < 0.66 ? rand(-ARENA.width * 0.1, ARENA.width * 0.1) :
                           rand(ARENA.maxX * 0.1, ARENA.maxX * 0.6);
        
        var z = ARENA.playerAtMin 
            ? rand(ARENA.maxZ * 0.6, ARENA.maxZ * 0.85)
            : rand(ARENA.minZ * 0.85, ARENA.minZ * 0.6);
        
        var lane = x < -ARENA.width * 0.2 ? 'left' : x > ARENA.width * 0.2 ? 'right' : 'middle';
        
        spawnTroop(chosenType, 'enemy', { x: x, y: ARENA.groundY, z: z }, lane);
    }
}

// ============================================================================
// WIN
// ============================================================================

function checkWin() {
    var pKing = null, eKing = null;
    for (var i = 0; i < state.buildings.length; i++) {
        if (state.buildings[i].type === 'king') {
            if (state.buildings[i].owner === 'player') pKing = state.buildings[i];
            else eKing = state.buildings[i];
        }
    }
    
    if (pKing && !pKing.active) {
        print('\n### DEFEAT ###\n');
        state.running = false;
    }
    if (eKing && !eKing.active) {
        print('\n### VICTORY ###\n');
        state.running = false;
    }
}

// ============================================================================
// PLAYER SIDE CHECK
// ============================================================================

function isPlayerSide(worldPos) {
    if (ARENA.playerAtMin) {
        return worldPos.z < ARENA.centerZ;
    }
    return worldPos.z > ARENA.centerZ;
}

// ============================================================================
// MATERIAL FIX
// ============================================================================

function ensureUniqueMaterials() {
    var slots = [script.cardSlot1, script.cardSlot2, script.cardSlot3, script.cardSlot4, script.nextCardSlot];
    
    for (var i = 0; i < slots.length; i++) {
        if (slots[i]) {
            var img = slots[i].getComponent('Component.Image');
            if (img && img.mainMaterial) {
                // CLONE the material so this slot has its own independent copy
                img.mainMaterial = img.mainMaterial.clone();
            }
        }
    }
    print('UI Materials cloned for uniqueness.');
}

// ============================================================================
// INIT
// ============================================================================

function init() {
    print('\n==============================');
    print('   GOLD MINE ROYALE v11');
    print('   (Proper UI Detection)');
    print('==============================\n');
    
    ensureUniqueMaterials();
    
    if (!calibrate()) return;
    
    state.buildings = [];
    var configs = [
        { type: 'king', owner: 'player', obj: script.playerKingTower },
        { type: 'king', owner: 'enemy', obj: script.enemyKingTower },
        { type: 'mine', owner: 'player', obj: script.playerLeftMine },
        { type: 'mine', owner: 'player', obj: script.playerRightMine },
        { type: 'mine', owner: 'enemy', obj: script.enemyLeftMine },
        { type: 'mine', owner: 'enemy', obj: script.enemyRightMine }
    ];
    for (var i = 0; i < configs.length; i++) {
        if (configs[i].obj) {
            state.buildings.push(new Building(configs[i].type, configs[i].owner, configs[i].obj));
        }
    }
    
    for (var j = 0; j < state.troops.length; j++) {
        if (state.troops[j].sceneObject) state.troops[j].sceneObject.destroy();
    }
    state.troops = [];
    
    for (var k = 0; k < state.lasers.length; k++) {
        if (state.lasers[k].sceneObject) state.lasers[k].sceneObject.destroy();
    }
    state.lasers = [];
    
    state.gold = script.startingGold || 5;
    state.goldAccumulator = 0;
    state.enemyGold = script.startingGold || 5;
    state.enemyGoldAccumulator = 0;
    
    initializeDeck();
    clearSelection();
    updateGoldUI();
    updateCardUI();
    
    botTimer = GAME.botInterval;
    state.running = true;
    
    print('');
    print('HOW TO PLAY:');
    print('1. TAP or DRAG from a card');
    print('2. RELEASE on your side of the arena');
    print('');
    print('Starting gold: ' + state.gold);
}

// ============================================================================
// UPDATE
// ============================================================================

function update(event) {
    updateCursor();
    
    if (!state.running) return;
    
    var dt = event.getDeltaTime();
    
    updateGold(dt);
    
    for (var i = 0; i < state.buildings.length; i++) {
        state.buildings[i].update(dt);
    }
    
    for (var j = 0; j < state.troops.length; j++) {
        state.troops[j].update(dt);
    }
    
    var alive = [];
    for (var k = 0; k < state.troops.length; k++) {
        if (state.troops[k].alive) alive.push(state.troops[k]);
    }
    state.troops = alive;
    
    for (var l = 0; l < state.lasers.length; l++) {
        state.lasers[l].update(dt);
    }
    var aliveLasers = [];
    for (var m = 0; m < state.lasers.length; m++) {
        if (state.lasers[m].alive) aliveLasers.push(state.lasers[m]);
    }
    state.lasers = aliveLasers;
    
    updateBot(dt);
    checkWin();
}

// ============================================================================
// TOUCH HANDLERS - USING PROPER SCREENTRANSFORM HIT TEST
// ============================================================================

function onTouchStart(e) {
    state.isTouching = true;
    
    var touchPos;
    try {
        touchPos = e.getTouchPosition();
    } catch (err) {
        print('TouchStart error: ' + err);
        return;
    }
    
    state.currentTouchPos = touchPos;
    
    // Use proper ScreenTransform hit test
    var cardIndex = getCardAtScreenPoint(touchPos);
    
    print('--- TOUCH START: screen(' + touchPos.x.toFixed(2) + ', ' + touchPos.y.toFixed(2) + ') -> Card: ' + cardIndex);
    
    if (cardIndex >= 0) {
        // Touched a card - try to select it
        if (trySelectCard(cardIndex)) {
            state.isDragging = true;
        }
    } else {
        // Touched arena area
        // If a card is already selected, we might want to spawn here
        if (state.selectedCardIndex >= 0) {
            // Keep selection, user might be tapping to spawn
            print('    Card ' + (state.selectedCardIndex + 1) + ' is selected, tapped arena');
        }
    }
}

function onTouchMove(e) {
    var touchPos;
    try {
        touchPos = e.getTouchPosition();
    } catch (err) {
        return;
    }
    
    state.currentTouchPos = touchPos;
    
    // If dragging with a selected card
    if (state.selectedCardIndex >= 0 && state.isDragging) {
        // Check if moved out of card area
        var stillOnCard = isOnAnyCard(touchPos);
        
        if (!stillOnCard) {
            // Now over the arena
            var world = screenToWorld(touchPos);
            var isValid = isPlayerSide(world);
            
            // 1. Update the Green/Red Ghost (Ground indicator)
            updateSpawnPreview(world, isValid);
            
            // 2. Update the Dangling 3D Model (The new feature)
            updateDragVisual(world);
        } else {
            // If we moved BACK onto the cards, hide the previews
             if (state.dragVisual) {
                state.dragVisual.destroy();
                state.dragVisual = null;
            }
            if (script.spawnPreviewGhost) script.spawnPreviewGhost.enabled = false;
        }
    }
}

function onTouchEnd(e) {
    state.isTouching = false;
    
    // CLEANUP VISUAL IMMEDIATELY
    if (state.dragVisual) {
        state.dragVisual.destroy();
        state.dragVisual = null;
    }
    
    if (!state.running) {
        init();
        return;
    }
    
    var touchPos;
    try {
        touchPos = e.getTouchPosition();
    } catch (err) {
        print('TouchEnd error: ' + err);
        clearSelection();
        return;
    }
    
    state.currentTouchPos = touchPos;
    
    var cardIndex = getCardAtScreenPoint(touchPos);
    
    print('--- TOUCH END: screen(' + touchPos.x.toFixed(2) + ', ' + touchPos.y.toFixed(2) + ') -> Card: ' + cardIndex + ' | Selected: ' + state.selectedCardIndex);
    
    // CASE 1: Have a selected card and released NOT on a card = try to spawn
    if (state.selectedCardIndex >= 0 && cardIndex < 0) {
        var world = screenToWorld(touchPos);
        print('    Attempting spawn at world(' + world.x.toFixed(2) + ', ' + world.z.toFixed(2) + ')');
        
        if (isPlayerSide(world)) {
            world.x = clamp(world.x, ARENA.minX * 0.9, ARENA.maxX * 0.9);
            
            if (spawnFromCard(state.selectedCardIndex, world)) {
                print('    >>> SPAWN SUCCESS!');
            } else {
                print('    >>> SPAWN FAILED (not enough gold?)');
            }
        } else {
            print('    >>> INVALID: Must spawn on your side!');
        }
        
        clearSelection();
    }
    // CASE 2: Released on a card
    else if (cardIndex >= 0) {
        if (state.selectedCardIndex >= 0 && cardIndex === state.selectedCardIndex) {
            // Tapped same card - keep it selected for next tap
            print('    Same card tapped, keeping selected. Tap arena to spawn!');
            state.isDragging = false;
        } else {
            // Different card or no previous selection - select this card
            clearSelection();
            trySelectCard(cardIndex);
            state.isDragging = false;
            print('    Card ' + (cardIndex + 1) + ' selected. Tap arena to spawn!');
        }
    }
    // CASE 3: No card selected and released not on card
    else {
        print('    No card selected and not on card - nothing to do');
        clearSelection();
    }
    
    // Hide spawn preview
    if (script.spawnPreviewGhost) {
        script.spawnPreviewGhost.enabled = false;
    }
}

// ============================================================================
// EVENTS
// ============================================================================

script.createEvent('OnStartEvent').bind(init);
script.createEvent('UpdateEvent').bind(update);
script.createEvent('TouchStartEvent').bind(onTouchStart);
script.createEvent('TouchMoveEvent').bind(onTouchMove);
script.createEvent('TouchEndEvent').bind(onTouchEnd);

print('v11 loaded - Using ScreenTransform.containsScreenPoint()');
print('Make sure to assign CardSlot1-4 as SceneObjects (not Image components)!');