import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, dataEdit, isOpen, onClose,editing,onCreate,onUpdate }) => {
  const [id_aeroporto, setIdAeroporto] = useState(dataEdit.id_aeroporto || "");
  const [nome_aeroporto, setNomeAeroporto] = useState(dataEdit.nome_aeroporto || "");
  const [codigo_iata, setCodigoIata] = useState(dataEdit.codigo_iata || "");
  const [cidade, setCidade] = useState(dataEdit.cidade || "");
  const [pais, setCodigoPaisIso] = useState(dataEdit.pais || "");
  const [latitude, setLatitude] = useState(dataEdit.latitude || "");
  const [longitude, setLongitude] = useState(dataEdit.longitude || "");
  const [altitude, setAltitude] = useState(dataEdit.altitude || "");
  
 
    const toast = useToast()

          
   

  const handleSave = () => {
    if (!nome_aeroporto || !codigo_iata || !cidade || !pais || !latitude || !longitude || !altitude ){
      toast(
        {
        position: 'top',
        description: 'Preencha todos os campos',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    return
    };

    if (editing) {
      onUpdate({id_aeroporto, nome_aeroporto, codigo_iata ,cidade,pais,latitude,longitude,altitude})
    }else{
      let id = data.length+1;
      onCreate({id_aeroporto:id, nome_aeroporto, codigo_iata ,cidade,pais,latitude,longitude,altitude})
    }
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(5px) hue-rotate(900deg)'
        />
        <ModalContent>
          <ModalHeader>{editing?'Editando Aeroporto : '+id_aeroporto:'Cadastrar novo aeroporto'} </ModalHeader>
          
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <Input
                  type="text"
                  placeholder="Nome do aeroporto"
                  value={nome_aeroporto}
                  onChange={(e) => setNomeAeroporto(e.target.value)}
                />
              </Box>
              <Box>
                <Input
                  type="text"
                  placeholder="Código IATA"
                  maxLength="3"
                  isDisabled = {editing}
                  value={codigo_iata}
                  onChange={(e) => setCodigoIata(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}
                />
              </Box>
              <Box>
                <Input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required />
              </Box>
              <Box>
                <Input
                  type="text"
                  placeholder="País"
                  maxLength="35"
                  value={pais}
                  onChange={(e) => setCodigoPaisIso(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}
                />
              </Box>
              <Box>
                <Input
                  type="text"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </Box>
              <Box>
                <Input
                  type="text"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </Box>
              <Box>
                <Input
                  type="text"
                  placeholder="Altitude"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} ml={100} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              VOLTAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
