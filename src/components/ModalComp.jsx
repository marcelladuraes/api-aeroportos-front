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
  const [codigo_pais_iso, setCodigoPaisIso] = useState(dataEdit.codigo_pais_iso || "");
  const [latitude, setLatitude] = useState(dataEdit.latitude || "");
  const [longitude, setLongitude] = useState(dataEdit.longitude || "");
  const [altitude, setAltitude] = useState(dataEdit.altitude || "");
  
 
    const toast = useToast()

          
   

  const handleSave = () => {
    if (!nome_aeroporto || !codigo_iata || !cidade || !codigo_pais_iso || !latitude || !longitude || !altitude ){
      toast(
        {
          position: 'top-right',
        title: 'Campos Nulos',
        description: 'Favor preencher todos os campos',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    return
    };

    if (editing) {
      onUpdate({id_aeroporto, nome_aeroporto, codigo_iata ,cidade,codigo_pais_iso,latitude,longitude,altitude})
    }else{
      let id = data.length+1;
      onCreate({id_aeroporto:id, nome_aeroporto, codigo_iata ,cidade,codigo_pais_iso,latitude,longitude,altitude})
    }
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing?'Editando Aeroporto : '+id_aeroporto:'Cadastro de Aeroporto'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome Aeroporto</FormLabel>
                <Input
                  type="text"
                  value={nome_aeroporto}
                  onChange={(e) => setNomeAeroporto(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Cod. IATA</FormLabel>
                <Input
                  type="text"
                  maxLength="3"
                  isDisabled = {editing}
                  value={codigo_iata}
                  onChange={(e) => setCodigoIata(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}
                />
              </Box>
              <Box>
                <FormLabel>Cidade</FormLabel>
                <Input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required />
              </Box>
              <Box>
                <FormLabel>Cod. Pais ISO</FormLabel>
                <Input
                  type="text"
                  maxLength="2"
                  value={codigo_pais_iso}
                  onChange={(e) => setCodigoPaisIso(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}
                />
              </Box>
              <Box>
                <FormLabel>Latitude</FormLabel>
                <Input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Longitude</FormLabel>
                <Input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Altitude</FormLabel>
                <Input
                  type="text"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
