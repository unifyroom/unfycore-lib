
from time import sleep
from hashlib import sha256
import struct
import sys
import socket

class GetDataPayload:
    
    @classmethod
    def from_hex(cls, payload):
        pass
    

paygetdata = "756e6679676574646174610000000000250000007327a252"



network_string = bytes.fromhex("756e6679") # Mainnet

def send(msg, payload):
    msg = msg.encode()
    
    ## Command is ASCII text, null padded to 12 bytes
    command = msg + ( ( 12 - len(msg) ) * b"\00" )

    ## Payload length is a uint32_t
    payload_raw = b""
    if payload:
        payload_raw = bytes.fromhex(payload)
    
    payload_len = struct.pack("I", len(payload_raw))

    ## Checksum is first 4 bytes of SHA256(SHA256(<payload>))
    checksum = sha256(payload_raw).digest()
    checksum = sha256(checksum).digest()[:4]

    sendwrite = network_string + command + payload_len + checksum + payload_raw
    return sendwrite
    

    
# send("verack", "")

address = "212.87.214.77:1464"
address = address.split(":")
address[1] = int(address[1])
address = tuple(address)



pesan = bytes.fromhex("756e667976657273696f6e00000000008d0000000c5013de56120100050c000000000000e1c2f76500000000050c00000000000000000000000000000000ffffa747077d05b8050c000000000000000000000000000000000000000000000000b2f093239ab3949f162f556e696679726f6f6d20436f72653a312e302e302f181e00000190abc100817720978b10fd30558c7b533127cb46ff2bf1937c3317265ad0f3ee00")

command = [
    pesan,
    send("verack", ""),
    bytes.fromhex("756e6679676574646174610000000000250000007327a252011400000098b619adf21aa92ee814ef8e2b2d941ae50a57ca8d1630581418a56108000000")
]


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(address)
    
    for cm in command:
        
        s.sendall(cm)
        print("---sending--------\n")
        print(cm)
        
        
        data = s.recv(1024)
        print("---response---------\n")
        print(data)
        
    while True:
        data = s.recv(1024)
        print("---response---------\n")
        if data == "":
            break
        
        


