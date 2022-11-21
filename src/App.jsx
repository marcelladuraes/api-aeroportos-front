import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  IconButton,
  Input,
  Center, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import useApi from "./hooks/useApi";

const App = () => {
  const api = useApi();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataOri, setDataOri] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const [serching, setSerching] = useState(false);
  const [serchText, setSerchText] = useState('');

  const toast = useToast()

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });


  useEffect(() => {
    let request = true;

    if (request) onRead();

    return () => {
      request = false;
    }
  }, [setData]);
  

  const onRead = () => {
    api.get('aeroportos')
      .then(({ data }) => {
        setData(data.aeroporto);
      })
      .catch(err => console.log(err));
  }

  const onCreate = (data) => {
    const formData = data;
    api.post(`aeroportos`, { ...formData })
      .then(({ data, response }) => {
        console.log(data);
        console.log(response);
        if (response.status == 201) {
          toast(
            {
              position: 'top-right',
              title: editing ? 'Atualizado com sucesso' : 'Inserido com sucesso',
              description: editing ? `Aeroporto ${data.estacao.nome_aeroporto} atualizado com sucesso` : `Aeroporto ${data.estacao.nome_aeroporto} adicionado com sucesso`,
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          onClose();
          onRead();
        } else {
          toast(
            {
              position: 'top-right',
              title: 'Erro ao Inserir',
              description: `Erro : ${data.msg}`,
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  const onUpdate = (data) => {
    const formData = data;
    api.put(`aeroportos/${data.codigo_iata}`, { ...formData })
      .then(({ data, response }) => {
        if (response.status == 200) {
          toast(
            {
              position: 'top-right',
              title: 'Atualizado com sucesso',
              description: `Aeroporto ${data.aeroporto.nome_aeroporto} atualizado com sucesso`,
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          onClose();
          onRead();
        } else {
          toast(
            {
              position: 'top-right',
              title: 'Erro ao Atualizar',
              description: `Erro : ${data.msg}`,
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
        }

      })
      .catch(err => console.log(err));
  }

  const onDelete = (codigo_iata) => {
    api.remove(`aeroportos/${codigo_iata}`)
      .then(({ response }) => {
        toast(
          {
            position: 'top-right',
            title: 'Registro Deletado',
            description: `Aeroporto IATA "${codigo_iata}" excluído com sucesso`,
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        onRead();
      })
      .catch(err => console.log(err));
  }


  const handleSearch = () => {
    if (serchText.length < 3) {
      toast(
        {
          position: 'top-right',
          title: 'Código IATA',
          description: 'Favor colocar os 3 caracteres para busca',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
    } else {
      setSerching(!serching)
      if (!serching) {
        api.get(`aeroportos/${serchText}`)
          .then(({ data,response }) => {
              if (response.status==200){
                setData(data.aeroporto);
              }else{
                toast(
                  {
                    position: 'top-right',
                    title: 'Erro na Busca',
                    description: `Não encontramos o aeroporto de Cod. IATA :${serchText} `,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  });
              }
          })
          .catch(err => console.log(err));
      } else {
        setSerchText('')
        onRead();
      }
    }
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box w="100%" h="100vh" py={50} px={50}>

        <Box as='row'>
          <Center>
            {isMobile ? <IconButton icon={<AddIcon />} colorScheme="blue" onClick={() => [setEditing(false), setDataEdit({}), onOpen()]}>

            </IconButton> : <Button pl={10} pr={10} colorScheme="blue" onClick={() => [setEditing(false), setDataEdit({}), onOpen()]}>
              NOVO CADASTRO
            </Button>}

            <Input ml={isMobile ? 5 : 20}
              isDisabled={serching}
              type="text"
              maxLength="3"
              value={serchText}
              onChange={(e) => setSerchText(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}>
            </Input>
            <IconButton ml={2} icon={serching ? <DeleteIcon /> : <SearchIcon />} colorScheme={serching ? "red" : "blue"} onClick={() => handleSearch()}>

            </IconButton>

          </Center>
        </Box>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  ID
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  IATA
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="15px">
                  Cidade
                </Th>
                <Th maxW={isMobile ? 5 : 1000} fontSize="15px">
                  ISO
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="15px">
                  Lat.
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="15px">
                  Long.
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="15px">
                  Alt.
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ id_aeroporto, nome_aeroporto, codigo_iata, cidade, codigo_pais_iso, latitude, longitude, altitude }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{id_aeroporto}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{nome_aeroporto}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{codigo_iata}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{cidade}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{codigo_pais_iso}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{latitude}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{longitude}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{altitude}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setEditing(true),
                        setDataEdit({ id_aeroporto, nome_aeroporto, codigo_iata, cidade, codigo_pais_iso, latitude, longitude, altitude, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => onDelete(codigo_iata)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          editing={editing}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}
    </Flex>
  );
};

export default App;
