/* Chose one of the import statement below */
import rainbowSDK from './rainbow-sdk.min.js'; // If you do not use the bundler
//import rainbowSDK from 'rainbow-web-sdk'; // If you use the bundler (for example - Webpack)


var onReady = function onReady() {
    var token = sessionStorage.getItem('rainbowToken');
    console.log(token);
    if (token) {
        // Token exists, sign in with the token
        rainbowSDK.connection.signinWithToken(token)
            .then(function(account) {
                // Successfully signed in with token
                console.log('Signed in Successfully');
                console.log(account);

            })
            .catch(function(err) {
                // An error occurs
                console.log('[Hello World] :: Something went wrong with the signing...', err);
            });
    } else {
        window.location.href = 'login.html';

    };
};

let onStarted = async function onStarted() {
    console.log('[Hello World] :: On SDK Started!');
    try {
        //// Test searching for a contact by name
        await testSearchByName("Fadi");

        // Test searching for a contact by ID
        //await searchById('6632d925721c43cd479846ac');

        // Test creating a new group
        // const newGroup = await createNewGroup("New Group 6", "This is a test group", false);

        // Add a contact to the newly created group
        const contactId = "66263685721c43cd4796bbca"; // Replace with the actual contact ID
        const groupId = '6632d3f006d040ccfa4f8211';
        /* try {
             const updatedGroup = await addContactToGroup(contactId, groupId);
             console.log(`Contact successfully added to the group: ${updatedGroup.name}`);
         } catch (error) {
             console.log('Failed to add contact to the group:', error);
         }*/



        // Call the function when a contact is selected

        try {

            // Test network functions
            //await inviteToNetwork(contactId);
            //await cancelInvitation();
            //await removeFromNetwork("5be9826de3bc5e54c13e00bd");


            // Check if conversation is defined
            // if (conversation) {
            //await onContactSelected(contactId);

            // Delete the last message in the conversation
            //await deleteMessageInConversation(conversation.id, lastMessageId);
            // await removeAllMessagesFromConversation(conversation.id);
            // } else {
            console.log("No conversation found for the contact ID:", contactId);
            //}

        } catch (error) {
            console.error('Error in onStarted:', error);
        }

        setTimeout(listAllGroups, 2000);
    } catch (error) {
        console.error('Error in onStarted:', error);
    }
};



let onLoaded = function onLoaded() {

    console.log('[Hello World] :: On SDK Loaded!');
    rainbowSDK
        .initialize('ac1da9d002eb11ef9f25994f9ae1ef66', 'Vpp3CV1Wx2jU4UKjYM6hMteJHsD10j4mghPq5dOpJpvmSqD8kBMbucfgbveADWWx')
        .then(() => {
            console.log('[Hello World] :: Rainbow SDK is initialized!');
            handleRainbowAuthenticationRedirect();
        })
        .catch(err => {
            console.log('[Hello World] :: Something went wrong with the SDK...', err);
        });
};

// Function to handle redirect back from Rainbow's authentication
function handleRainbowAuthenticationRedirect() {

    var hashParams = new URLSearchParams(window.location.hash.substring(1)); // Remove the leading '#'
    var token = hashParams.get('access_token');
    if (token) {
        sessionStorage.setItem('rainbowToken', token);
        console.log('[Hello World] :: Authentication redirect handled:');
    }

}


var onStopped = function onStopped(event) {
    // The SDK has been completely stopped.
    console.log('[Hello World] :: On SDK completely stopped!');
};


var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event) {
    let status = event.detail.status;

    switch (status) {
        case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:
            console.log('[Hello World] :: connection has changed to "connected" which means:your application is now connected to Rainbow')
                // The state of the connection has changed to "connected" which means that your application is now connected to Rainbow
            break;
        case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:
            console.log('[Hello World] :: connection is now in progress which means:your application try to connect to Rainbow')
                // The state of the connection is now in progress which means that your application try to connect to Rainbow
            break;
        case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:
            console.log('[Hello World] :: connection changed to "disconnected" which means:your application is no more connected to Rainbow')
                // The state of the connection changed to "disconnected" which means that your application is no more connected to Rainbow
            break;
        default:
            break;
    };
};


var signout = function signout() {

    // The SDK for Web is ready to be used, so you can sign in
    rainbowSDK.connection.signout()
        .then(function() {
            // Successfully signed out from Rainbow
            console.log('[Hello World] :: Successfully signed out from Rainbow')
        })
        .catch(function(err) {
            // An error occurs during the stop of the Rainbow SDK

        });
};


// Fonction pour gérer le clic sur le bouton de déconnexion
var handleSignoutClick = function() {
    rainbowSDK.connection.signout()
        .then(function() {
            // Successfully signed out from Rainbow
            console.log('[Hello World] :: Successfully signed out from Rainbow');

            // Delete token from session storage
            sessionStorage.removeItem('rainbowToken');

            // Redirect to the login page
            window.location.href = 'login.html';

        })
        .catch(function(err) {
            // An error occurs during the stop of the Rainbow SDK
            console.error('[Hello World] ::  Error during sign out:', err);
        });
};

// Ajouter un écouteur d'événements pour le clic sur le bouton de déconnexion
document.getElementById("signoutBtn").addEventListener("click", handleSignoutClick);


// Subscribe to Rainbow connection change event
document.addEventListener(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);

// Listen when the SDK is stopped
document.addEventListener(rainbowSDK.connection.RAINBOW_ONSTOPPED, onStopped)
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);
document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
document.addEventListener(rainbowSDK.connection.RAINBOW_ONSTARTED, onStarted); // event will be fired once user connects and all SDK services start
rainbowSDK.start();
rainbowSDK.load();



// togller button logout with profile

// popup a poge to displat the connected user
function toggleProfilePopup() {
    var popup = document.getElementById("profilePopup");
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
        handleProfile();
    }
}

function handleProfile() {
    var user = rainbowSDK.contacts.getConnectedUser();
    console.log('[Hello World] :: coneected user ' + user)
    if (user) {
        var username = user.firstName + " " + user.lastName;
        var email = user.loginEmail;
        var avatarUrl = user.avatar;
        var job = user.jobTitle;

        // Update profile popup with fetched data
        document.getElementById("username").innerText = username;
        document.getElementById("email").innerText = email;
        document.getElementById("popupAvatar").src = avatarUrl;
        document.getElementById("jobTitle").innerText = job;
    }
}

// Event listener registration
document.getElementById('profileIcon').addEventListener('click', toggleProfilePopup);

// fin //

// Search //

function testSearchByName(searchQuery) {
    rainbowSDK.contacts.searchByName(searchQuery, 10).then(function(usersFound) {
        if (usersFound.length > 0) {
            console.log(`${usersFound.length} users found.`);
            usersFound.forEach(user => {
                console.log(`User Found: ${user.displayName} - Email: ${user.loginEmail} - user ID : ${user.dbId} `);
            });
        } else {
            console.log('No users found.');
        }
    }).catch(function(err) {
        console.log('Error searching users:', err);
    });
}

function searchById(id) {
    rainbowSDK.contacts.searchById(id).then(function(entityFound) {
        if (entityFound) {
            console.log('Name' + entityFound.displayName + ' - ID - ' + entityFound.dbId + ' - JID - ' + entityFound.id + ' - Email - ' + entityFound.emailPro);

        } else {
            console.log('No users found.');
        }
    }).catch(function(err) {
        console.error('Error searching for user by ID:', err);
    });
}
// Fin //

// Group //

// Function to list all groups
function listAllGroups() {
    var groups = rainbowSDK.groups.getAll();
    //console.log('groups', groups);
    groups.forEach(group => {
        //console.log('group', group);
        console.log(`Group ID: ${group.id}, Name: ${group.name} `);
    });
}

// Function to list favorite groups
function listFavoriteGroups() {
    var favoritesGroups = rainbowSDK.groups.getFavoritesGroups();
    favoritesGroups.forEach(group => {
        console.log(`Favorite Group ID: ${group.id}, Name: ${group.name}`);
    });
}

// Function to create a new group
async function createNewGroup(name, description, isFavorite) {
    try {
        const group = await rainbowSDK.groups.createGroup(name, description, isFavorite);
        console.log('Created Group:', group);
        return group; // Return the created group object
    } catch (error) {
        console.error('Error creating new group:', error);
        throw error; // Throw the error for further handling
    }
}


// Function to mark a group as favorite
function setGroupAsFavorite(groupId) {
    var group = rainbowSDK.groups.getGroupById(groupId);
    rainbowSDK.groups.setGroupAsFavorite(group)
        .then(updatedGroup => {
            console.log('Group set as favorite:', updatedGroup);
        })
        .catch(err => {
            console.error('Error setting group as favorite:', err);
        });
}

// Function to add a contact to a group
async function addContactToGroup(contactId, groupId) {
    try {
        // Retrieve the group object
        const group = await rainbowSDK.groups.getGroupById(groupId);

        // Check if the group object is valid
        if (!group) {
            throw new Error("Group not found or null");
        }

        // Retrieve the contact object using a different method, if available
        //const contact = await rainbowSDK.contacts.getContactById(contactId);

        // Add the contact to the group
        const updatedGroup = await rainbowSDK.groups.addContactInGroup(contactId, group);

        console.log('Updated Group with new contact:', updatedGroup);
        return updatedGroup; // Resolve with the updated group object
    } catch (error) {
        console.error('Error adding contact to group:', error);
        throw error; // Reject with the error
    }
}




// Function to get detailed group by ID
function getDetailedGroupById(groupId) {
    rainbowSDK.groups.getDetailedGroupById(groupId)
        .then(detailedGroup => {
            console.log('Detailed Group Info:', detailedGroup);
        })
        .catch(err => {
            console.error('Error getting detailed group info:', err);
        });
}

// Function to delete a group
function deleteGroup(groupId) {
    var group = rainbowSDK.groups.getGroupById(groupId);
    rainbowSDK.groups.deleteGroup(group)
        .then(() => {
            console.log('Group deleted successfully');
        })
        .catch(err => {
            console.error('Error deleting group:', err);
        });
}


// Fin //

// Network invitation //

// Define event listener for incoming invitations
let onInvitationReceived = function(event) {
    let invitation = event.detail;
    console.log("Received invitation:", invitation);

    // Accept the invitation
    rainbowSDK.contacts.acceptInvitation(invitation)
        .then(() => {
            console.log("Invitation accepted successfully");
        })
        .catch(err => {
            console.error("Error accepting invitation:", err);
        });
};

// Listen to incoming invitations
document.addEventListener(rainbowSDK.contacts.RAINBOW_ONCONTACTINVITATIONRECEIVED, onInvitationReceived);

// Function to invite someone to your network
async function inviteToNetwork(contactId) {
    try {
        // Search for the contact by ID
        let contact = await rainbowSDK.contacts.getContactById(contactId);
        if (contact) {
            // Add contact to your network
            await rainbowSDK.contacts.addToNetwork(contactId);
            console.log("Invitation sent successfully");
        } else {
            console.error("Contact not found");
        }
    } catch (error) {
        console.error("Error inviting to network:", error);
    }
}

// Function to cancel a pending invitation
async function cancelInvitation() {
    try {
        // Get list of sent invitations
        let invitationsSent = rainbowSDK.contacts.getInvitationsSent();
        if (invitationsSent.length > 0) {
            let invitation = invitationsSent[0];
            // Cancel the invitation
            await rainbowSDK.contacts.cancelInvitation(invitation);
            console.log("Invitation cancelled successfully");
        } else {
            console.error("No pending invitations to cancel");
        }
    } catch (error) {
        console.error("Error cancelling invitation:", error);
    }
}

// Function to remove a contact from your network
async function removeFromNetwork(contactId) {
    try {
        // Get the contact object
        let contact = rainbowSDK.contacts.getContactById(contactId);
        if (contact) {
            // Remove contact from your network
            await rainbowSDK.contacts.removeFromNetwork(contact);
            console.log("Contact removed from network successfully");
        } else {
            console.error("Contact not found");
        }
    } catch (error) {
        console.error("Error removing from network:", error);
    }
}


// fin //

// Chat //

async function onContactSelected(contactId) {
    try {
        let selectedContact = await rainbowSDK.contacts.getContactById(contactId);

        // Contact not found locally, ask the server
        if (!selectedContact) {
            selectedContact = await rainbowSDK.contacts.searchContactById(contactId);
            if (!selectedContact) {
                console.error("No contact found with ID:", contactId);
                return;
            }
        }

        // Retrieve the associated Conversation object
        let conversation = await rainbowSDK.conversations.getConversationByContactId(contactId);

        // Get previous messages
        await rainbowSDK.im.getMessagesFromConversation(conversation.id, 30);

        // Listen for new messages
        let onNewMessageReceived = function(event) {
            let message = event.detail.message;
            if (message.conversationId === conversation.id) {
                // Display the new message
                console.log("New message:", message);
            }
        };

        document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived);

        // Prompt the user to enter a message
        let messageContent = prompt("Enter your message:");

        // Check if the user canceled the prompt
        if (messageContent === null) {
            console.log("Message sending canceled.");
            return;
        }

        // Send the message
        let sentMessage = await rainbowSDK.im.sendMessageToConversation(conversation.id, messageContent);
        console.log("Message sent:", sentMessage);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Listen for message receipts
let onNewMessageReceiptReceived = function(event) {
    let message = event.detail.message;
    let conversation = event.detail.conversation;
    let type = event.detail.type;

    switch (type) {
        case "server":
            // Do something when Rainbow receives your message
            console.log("Message received by Rainbow");
            break;
        case "received":
            // Do something when the recipient application receives your message
            console.log("Message received by recipient application");
            break;
        case "read":
            // Do something when the recipient application or the recipient user reads your message
            console.log("Message read by recipient");
            break;
        default:
            break;
    }
};

document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMRECEIPTRECEIVED, onNewMessageReceiptReceived);

// Send a read receipt when a message is received
let onNewMessageReceived = function(event) {
    let message = event.detail.message;
    let conversation = event.detail.conversation;
    // Do something with the new message
    console.log("New message:", message);


    // Get the message ID
    let messageId = message.id;
    console.log('Mesaage id', messageId);
    // Now you can use the message ID to delete the message
    deleteMessageInConversation(conversation.id, messageId);

    // Send a read receipt
    rainbowSDK.im.markMessageFromConversationAsRead(conversation.id, message.id);

};

document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived);

// Function to delete the last message sent by the logged-in user in a conversation
async function deleteMessageInConversation(conversationId, messageId) {
    try {
        // Retrieve the conversation object
        let conversation = await rainbowSDK.conversations.getConversationById(conversationId);

        // Delete the message with the provided ID
        await rainbowSDK.im.deleteMessage(conversation, messageId);
        console.log("Message deleted successfully");
    } catch (error) {
        console.error("Error deleting message:", error);
    }
}


// Function to remove all messages from a conversation
async function removeAllMessagesFromConversation(conversationId) {
    try {
        await rainbowSDK.im.removeAllMessagesFromConversation(conversationId);
        console.log("All messages removed from the conversation");
    } catch (error) {
        console.error("Error removing messages from conversation:", error);
    }
}

// Fin //