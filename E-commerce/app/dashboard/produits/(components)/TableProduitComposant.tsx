"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useProduits } from "../(hooks)/UseProduits";
import { Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TableProduitComposant = () => {
  const { data: produits, isLoading } = useProduits();
  const [recherche, setRecherche] = useState("");
  const [promotion, setPromotion] = useState(false);
  const [categorie, setCategorie]= useState("tous");
  const [stock, setStock] = useState("tous")

  const GestionduStock = (quantitestock: number) => {
    if (quantitestock <= 15) return "bg-red-500 text-white";
    else if (quantitestock >= 16 && quantitestock <= 70)
      return "bg-yellow-500 text-white";
    else return "bg-green-500 text-white";
  };

  const tableauFiltre = produits?.filter((produit) => {
    const InputRecherche = produit.nom.toLowerCase().includes(recherche.toLowerCase());
    const FiltrePromotion = !promotion || produit.enPromotion === true;
    const FiltreCategorie = categorie === "tous" || produit.categorie.toLowerCase() === categorie.toLowerCase()
    const FiltreStock = 
    stock === "tous" || 
    (stock === "faible" && produit.quantiteStock <= 15) ||
    (stock === "moyen" && produit.quantiteStock >= 16 && produit.quantiteStock <= 70) ||
    (stock === "excellent" && produit.quantiteStock > 70);
    return InputRecherche && FiltrePromotion && FiltreCategorie && FiltreStock ;
  });

  if (isLoading) return <p> Ca charge </p>;

  return (
    <div className="rounded-md  p-6 mt-6">
      <h1 className="text-3xl font-bold m-4 text-center">Liste des produits </h1>
      <div className="flex items-center justify-between m-5 ">
        <div className="flex">
          <Button>Ajouter un produit </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={promotion}
              onCheckedChange={() => setPromotion(!promotion)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Promotion
            </label>
          </div>

          <Select defaultValue="tous" onValueChange={(value) => setStock(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Niveau de stock" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Stock</SelectLabel>
      <SelectItem value="tous">Tous</SelectItem>
      <SelectItem value="faible">Stock Faible (15 max)</SelectItem>
      <SelectItem value="moyen">Stock Moyen (16 a 70) </SelectItem>
      <SelectItem value="excellent">Stock excellent (71 et + )</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

          <Select  onValueChange={(value) => setCategorie(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Quantité de stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catégories</SelectLabel>
                 <SelectItem value="tous">Toutes les catégories</SelectItem>
                <SelectItem value="ELECTRONIQUE">Electronique </SelectItem>
                <SelectItem value="INFORMATIQUE">Informatique</SelectItem>
                <SelectItem value="GAMING">Gaming</SelectItem>
                <SelectItem value="MOBILIER">Mobilier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => setRecherche(e.target.value)}
            value={recherche}
            className="w-44 border border-black"
            placeholder="Nom Produit"
          ></Input>
        </div>
      </div>
      <Table className="rounded-3xl">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="font-bold text-black">Nom</TableHead>
            <TableHead className="font-bold text-black">Prix </TableHead>
            <TableHead className="font-bold text-black">
              Prix en Promotion
            </TableHead>
            <TableHead className="font-bold text-black">
              Quantité Stock
            </TableHead>
            <TableHead className="font-bold text-black">En Promotion</TableHead>
            <TableHead className="font-bold text-black">Catégorie</TableHead>
            <TableHead className="font-bold text-black"> Images</TableHead>
            <TableHead className="font-bold text-black">
              {" "}
              Date création
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableauFiltre?.map((produit) => (
            <TableRow key={produit.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{produit.nom}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {produit.prix} <Euro size={16} />
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    produit.prixPromo
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {produit.prixPromo
                    ? produit.prixPromo + produit.prixPromo
                    : "Pas en Promo"}
                  {produit.prixPromo ? <Euro className="w-4" /> : ""}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={GestionduStock(produit.quantiteStock)}>
                  {" "}
                  {produit.quantiteStock}{" "}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    produit.enPromotion === true
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {produit.enPromotion === true ? "Oui" : "Non"}
                </Badge>
              </TableCell>
              <TableCell>{produit.categorie.toLowerCase()}</TableCell>
              <TableCell> {produit.images.length}</TableCell>
              <TableCell>
                {new Date(produit.createdAt).toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableProduitComposant;
